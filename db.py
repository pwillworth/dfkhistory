#!/usr/bin/env python3
import psycopg2
import settings
import hashlib
import time
from web3 import Web3
from hexbytes import HexBytes
from eth_account.messages import encode_defunct
from datetime import timezone, datetime, timedelta
import random


def aConn():
    conn = psycopg2.connect("sslmode=verify-full sslrootcert=certs/root.crt options=--cluster=frugal-toad-1243",
        host = settings.DB_HOST,
        port = "26257",
	    dbname= settings.DB_NAME,
	    user = settings.DB_USER,
	    password = settings.DB_PASS)
    conn.autocommit = True

    return conn

def getAccountNonce(account):
    result = ''
    con = aConn()
    cur = con.cursor()
    cur.execute("SELECT nonce FROM members WHERE account = %s", (account,))
    row = cur.fetchone()
    if row != None:
        result = row[0]
    else:
        result = random.randint(1,10000000)
        generateTime = datetime.now(timezone.utc)
        cur.execute("INSERT INTO members (account, nonce, generatedTimestamp, expiresTimestamp) VALUES (%s, %s, %s, %s)", (account, result, int(datetime.timestamp(generateTime)), int(datetime.timestamp(generateTime))+86400))

    con.close()

    return result

def getSession(account, signature):
    result = 0
    #sessions persist up to 180 days
    duration = 15552000
    con = aConn()
    cur = con.cursor()
    cur.execute("SELECT nonce FROM members WHERE account = %s", (account,))
    row = cur.fetchone()
    if row != None:
        result = row[0]
    else:
        con.close()
        return 'Error: account does not exist'

    msg = 'DFK History login uses no transaction or gas fees.\n\nClick Sign to verify you own this wallet and login.\n\nIf you have cookies enabled, your session can persist for up to 6 months or until you logout.\n\nnonce: {0}'.format(result)
    w3 = Web3(Web3.HTTPProvider(""))
    message = encode_defunct(text=msg)
    address = w3.eth.account.recover_message(message, signature=HexBytes(signature))

    if address == account:
        # new session
        sidHash = str(time.time()) + account
        sid = hashlib.sha1(sidHash.encode()).hexdigest()
        updatestr = 'INSERT INTO sessions (sid, account, expires) VALUES (%s, %s, %s)'
        cur.execute(updatestr, (sid, account, time.time() + duration))
        # update login time and nonce for next login attempt
        generateTime = datetime.now(timezone.utc)
        updatestr = 'UPDATE members SET lastLogin=%s, nonce=%s WHERE account=%s'
        cur.execute(updatestr, (int(datetime.timestamp(generateTime)), random.randint(1,10000000), account))
        result = sid
    else:
        result = 'Error: authentication failed, bad signature'
    con.close()
    return result

# look up a session id and see if it is valid
def checkSession(sid):
	con = aConn()
	cursor = con.cursor()
	cursor.execute('SELECT account, expires FROM sessions WHERE sid=%s', (sid,))
	row = cursor.fetchone()
	if row == None:
		# no record
		result = ""
	else:
		if time.time() > row[1]:
			# session is expired, delete it
			result = ""
			tempSQL = "DELETE FROM tSessions WHERE sid='" + sid + "'"
			cursor.execute(tempSQL)
		else:
			# good session, return userid
			result = row[0]

	cursor.close()
	con.close()
	return result

def getPlayerWallets(conn, playerId):
    wallets = []
    with conn.cursor() as cursor:
        cursor.execute("SELECT wallet FROM wallets WHERE account=%s", (playerId,))
        row = cursor.fetchone()
        while row != None:
            wallets.append(row[0])
            row = cursor.fetchone()

    return wallets

def addWallet(playerId, wallet):
    con = aConn()
    wCount = 1
    result = 0
    try:
        with con.cursor() as cursor:
            cursor.execute("SELECT wallet FROM wallets WHERE account=%s", (playerId,))
            row = cursor.fetchone()
            while row != None:
                wCount += 1
                row = cursor.fetchone()
            if wCount < 16:
                cursor.execute("INSERT INTO wallets VALUES (%s, %s)", (playerId, wallet))
                result = cursor.rowcount
            else:
                result = -1
    except psycopg2.errors.UniqueViolation as e:
        result = 0
    con.close()

    return result

def removeWallet(playerId, wallet):
    con = aConn()

    with con.cursor() as cursor:
        cursor.execute("DELETE FROM wallets WHERE account=%s AND wallet=%s", (playerId, wallet))

    return cursor.rowcount

def getMemberStatus(account):
    memberState = 0
    requestTime = datetime.now(timezone.utc).timestamp()
    expiresTimestamp = 0
    secondsLeft = 0
    con = aConn()
    with con.cursor() as cur:
        cur.execute('SELECT expiresTimestamp FROM members WHERE account=%s', (account,))
        row = cur.fetchone()
        if row[0] != None:
            expiresTimestamp = row[0]
            secondsLeft = expiresTimestamp - requestTime
        if expiresTimestamp != None and requestTime < expiresTimestamp:
            if secondsLeft > 0:
                memberState = 2
            else:
                memberState = 1
        else:
            memberState = 1
    wallets = getPlayerWallets(con, account)
    con.close()
    return [memberState, secondsLeft, expiresTimestamp, wallets]

def dbInsertSafe(insertStr):
    newStr = ""
    if (insertStr != None):
        for i in range(len(str(insertStr))):
            if (str(insertStr)[i] == "'"):
                newStr = newStr + "'"
            newStr = newStr + str(insertStr)[i]
    return newStr

def getLevelUps(heroId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampStart DESC'
    else:
        orderStr = 'ORDER BY blockTimestampStart'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHashStart, txHashEnd, addressStart, addressEnd, blockNumberStart, blockNumberEnd, owner, blockTimestampStart, blockTimestampEnd, toLevel, bonus, blessing1, blessing2, enhancementItem, statResults from meditations WHERE heroId=%s {0}'.format(orderStr), (heroId,))
            result = cur.fetchall()
    return result

def getLifeEvents(heroId, order):
    result = []
    heroEvents = ('darkSummonSacrifice','HeroClaimed','crystalvaleRewardPJ','crystalvaleStatUpPJ','gen0rerollStatUp','geneRerollStatUp')
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampStart DESC'
    else:
        orderStr = 'ORDER BY blockTimestampStart'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, eventType, eventData AS enhancementItem from events WHERE heroId=%s AND eventType IN %s ORDER BY blockTimestamp', (heroId, heroEvents))
            result = cur.fetchall()
            cur.execute('SELECT network, txHashHero, blockNumberHero, owner, blockTimestampHero, crystalEvent, enhancementItem, summonerId, assistantId from summons WHERE heroId=%s ORDER BY blockTimestampHero', (heroId,))
            sresult = cur.fetchall()
    return sresult + result

def getSales(heroId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
    else:
        orderStr = 'ORDER BY blockTimestamp'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, winner, salePrice from sales WHERE itemType=%s AND itemId=%s {0}'.format(orderStr), ('hero', heroId))
            result = cur.fetchall()
    return result

def getRentals(heroId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
    else:
        orderStr = 'ORDER BY blockTimestamp'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, winner, salePrice from sales WHERE itemType=%s AND itemId=%s {0}'.format(orderStr), ('assist', heroId))
            result = cur.fetchall()
    return result

def getSummons(heroId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampHero DESC'
    else:
        orderStr = 'ORDER BY blockTimestampHero'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHashHero, blockNumberHero, owner, blockTimestampHero, heroId, enhancementItem, summonerId, assistantId, summonerTears, assistantTears from summons WHERE summonerId=%s or assistantId=%s {0}'.format(orderStr), (heroId,heroId))
            result = cur.fetchall()
    return result

def getPetLifeEvents(petId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampStart DESC'
    else:
        orderStr = 'ORDER BY blockTimestampStart'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, eventType, eventData AS eggType from events WHERE heroId=%s AND eventType=%s ORDER BY blockTimestamp', (petId,'CompletedPetExchange'))
            result = cur.fetchall()
            cur.execute('SELECT network, txHashCrack, blockNumberCrack, owner, blockTimestampCrack, \'hatch\' AS eventType, eggType, tier from hatches WHERE petId=%s ORDER BY blockTimestampCrack', (petId,))
            sresult = cur.fetchall()
    return sresult + result

def getPetSales(petId, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
    else:
        orderStr = 'ORDER BY blockTimestamp'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, winner, salePrice from sales WHERE itemType=%s AND itemId=%s {0}'.format(orderStr), ('pet', petId))
            result = cur.fetchall()
    return result

def getEquipmentLifeEvents(equipmentId, equipmentType, order):
    result = []
    equipmentType = equipmentType.capitalize()
    equipEvents = ('{0}Created'.format(equipmentType), '{0}Updated'.format(equipmentType))
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
    else:
        orderStr = 'ORDER BY blockTimestamp'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, eventType, eventData from events WHERE heroId=%s AND eventType IN %s {0}'.format(orderStr), (equipmentId, equipEvents))
            result = cur.fetchall()

    return result

def getEquipmentSales(equipmentId, equipmentType, order):
    result = []
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
    else:
        orderStr = 'ORDER BY blockTimestamp'
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, owner, blockTimestamp, winner, salePrice from sales WHERE itemType=%s AND itemId=%s {0}'.format(orderStr), (equipmentType, equipmentId))
            result = cur.fetchall()
    return result

def getPlayerLevelUps(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampStart DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampStart < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestampStart'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampStart > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHashStart, txHashEnd, addressStart, addressEnd, blockNumberStart, blockNumberEnd, heroId, blockTimestampStart, blockTimestampEnd, toLevel, bonus, blessing1, blessing2, enhancementItem, statResults, owner from meditations WHERE owner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()
    return result

def getPlayerLifeEvents(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestamp < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestamp'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampStart > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, heroId, blockTimestamp, eventType, eventData AS enhancementItem from events WHERE owner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()

    return result

def getPlayerSales(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestamp < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestamp'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampStart > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, itemId, blockTimestamp, winner, salePrice, owner, itemType from sales WHERE owner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()
    return result

def getPlayerPurchases(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestamp DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestamp < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestamp'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampStart > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHash, blockNumber, itemId, blockTimestamp, winner, salePrice, owner, itemType from sales WHERE winner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()
    return result

def getPlayerSummons(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampHero DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampHero < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestampHero'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampHero > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHashHero, blockNumberHero, owner, blockTimestampHero, heroId, enhancementItem, summonerId, assistantId, summonerTears, assistantTears from summons WHERE owner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()
    return result

def getPlayerHatches(playerId, order, timestampLimit=0):
    result = []
    filterStr = ''
    if order == 'desc':
        orderStr = 'ORDER BY blockTimestampCrack DESC'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampCrack < {0}'.format(timestampLimit)
    else:
        orderStr = 'ORDER BY blockTimestampCrack'
        if timestampLimit > 0:
            filterStr = 'AND blockTimestampCrack > {0}'.format(timestampLimit)

    con = aConn()
    wallets = getPlayerWallets(con, playerId)
    wallets.append(playerId)
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT network, txHashCrack, blockNumberCrack, owner, blockTimestampCrack, petId, eggType, tier from hatches WHERE owner IN %s {1} {0} LIMIT 25'.format(orderStr, filterStr), (tuple(wallets),))
            result = cur.fetchall()
    return result

def getMemberStats():
    results = [0,0]
    requestTime = datetime.now(timezone.utc).timestamp()
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('SELECT Count(account), Max(expiresTimestamp) FROM members WHERE expiresTimestamp > %s', (requestTime,))
            results = cur.fetchone()
    if results != None:
        results = [results[0], datetime.fromtimestamp(results[1]).isoformat()]
    return results

def getSummaryData(period):
    result = ''
    todayDate = datetime.now()
    minDate = datetime(todayDate.year, todayDate.month, todayDate.day, tzinfo=timezone.utc) - timedelta(days=1)
    maxDate = minDate
    if period == 'ytd':
        minDate = datetime(todayDate.year, 1, 1, tzinfo=timezone.utc)
        maxDate = todayDate - timedelta(days=1)
    elif period == '30d':
        minDate = todayDate - timedelta(days=31)
        maxDate = todayDate - timedelta(days=1)
    elif period == '90d':
        minDate = todayDate - timedelta(days=91)
        maxDate = todayDate - timedelta(days=1)
    elif period == 'all':
        minDate = datetime(2021, 8, 1, tzinfo=timezone.utc)
        maxDate = todayDate
    else:
        try:
            minDate = datetime.strptime(period, '%y-%M-%d')
            maxDate = minDate
        except Exception as e:
            # default
            result = 'defaulted {0}'.format(e)
    con = aConn()
    with con.cursor() as cur:
        cur.execute('SELECT network, Max(blockDate), SUM(heroSalesCount), SUM(heroSalesTotal), SUM(heroSalesTotal * tokenPrice) AS heroSalesUSD, SUM(petSalesCount), SUM(petSalesTotal), SUM(petSalesTotal*tokenPrice) AS petSalesUSD, SUM(weaponSalesCount), SUM(weaponSalesTotal), SUM(weaponSalesTotal*tokenPrice) AS weaponSalesUSD, SUM(accessorySalesCount), SUM(accessorySalesTotal), SUM(accessorySalesTotal*tokenPrice) AS accessorySalesUSD, SUM(armorSalesCount), SUM(armorSalesTotal), SUM(armorSalesTotal*tokenPrice) AS armorSalesUSD, SUM(heroHireCount), SUM(heroHireTotal), SUM(heroHireTotal * tokenPrice) AS heroHireUSD, SUM(favorHatches), SUM(graceHatches), SUM(boonHatches), SUM(meditationCount), SUM(meditationLevels), SUM(summonCount), SUM(darkSummonCount), SUM(accessoryCreated), SUM(armorCreated), SUM(weaponCreated) FROM summary WHERE blockDate BETWEEN %s AND %s GROUP BY network', (minDate, maxDate))
        results = cur.fetchall()
    con.close()

    return results

def createDatabase():
    con = aConn()
    with con:
        with con.cursor() as cur:
            cur.execute('CREATE TABLE IF NOT EXISTS hatches (network VARCHAR(31), txHashIncubate VARCHAR(127), txHashCrack VARCHAR(127), addressIncubate VARCHAR(63), addressCrack VARCHAR(63), blockNumberIncubate INTEGER, blockNumberCrack INTEGER, blockTimestampIncubate INTEGER, blockTimestampCrack INTEGER, owner VARCHAR(63), eggId INTEGER, petId BIGINT, eggType INT, tier INT, PRIMARY KEY (network, eggId), INDEX IX_hatches_pet (petId), INDEX IX_hatches_owner (owner))')
            cur.execute('CREATE TABLE IF NOT EXISTS summons (network VARCHAR(31), txHashCrystal VARCHAR(127), txHashHero VARCHAR(127), addressCrystal VARCHAR(63), addressHero VARCHAR(63), blockNumberCrystal INTEGER, blockNumberHero INTEGER, blockTimestampCrystal INTEGER, blockTimestampHero INTEGER, owner VARCHAR(63), crystalId INTEGER, heroId BIGINT, summonerId BIGINT, assistantId BIGINT, enhancementItem VARCHAR(63), summonerTears INTEGER, assistantTears INTEGER, crystalEvent VARCHAR(63), PRIMARY KEY (network, addressCrystal, crystalId), INDEX IX_summons_hero (heroId), INDEX IX_summons_summoner (summonerId), INDEX IX_summons_assistant (assistantId), INDEX IX_summons_owner (owner))')
            cur.execute('CREATE TABLE IF NOT EXISTS meditations (network VARCHAR(31), txHashStart VARCHAR(127), txHashEnd VARCHAR(127), addressStart VARCHAR(63), addressEnd VARCHAR(63), blockNumberStart INTEGER, blockNumberEnd INTEGER, owner VARCHAR(63), meditationId INTEGER, blockTimestampStart INTEGER, blockTimestampEnd INTEGER, heroId BIGINT, toLevel SMALLINT, bonus SMALLINT, blessing1 SMALLINT, blessing2 SMALLINT, enhancementItem VARCHAR(63), statResults TEXT, PRIMARY KEY (network, meditationId), INDEX IX_meditations_hero (heroId), INDEX IX_meditations_owner (owner))')
            cur.execute('CREATE TABLE IF NOT EXISTS sales (network VARCHAR(31), txHash VARCHAR(127), blockNumber INTEGER, address VARCHAR(63), owner VARCHAR(63), blockTimestamp INTEGER, itemId BIGINT, itemType VARCHAR(15), winner VARCHAR(63), salePrice DOUBLE PRECISION, auctionId BIGINT, PRIMARY KEY (network, txHash), INDEX IX_sales_item (itemType, itemId), INDEX IX_sales_winner (winner), INDEX IX_sales_owner (owner))')
            cur.execute('CREATE TABLE IF NOT EXISTS events (network VARCHAR(31), txHash VARCHAR(127), blockNumber INTEGER, address VARCHAR(63), owner VARCHAR(63), blockTimestamp INTEGER, heroId BIGINT, eventType VARCHAR(31), eventData TEXT, PRIMARY KEY (network, txHash, heroId), INDEX IX_events_hero (heroId), INDEX IX_events_owner (owner))')
            cur.execute('CREATE TABLE IF NOT EXISTS summary (network VARCHAR(31), blockDate TIMESTAMP, heroSalesCount INTEGER, heroSalesTotal DOUBLE PRECISION, petSalesCount INTEGER, petSalesTotal DOUBLE PRECISION, weaponSalesCount INTEGER, weaponSalesTotal DOUBLE PRECISION, accessorySalesCount INTEGER, accessorySalesTotal DOUBLE PRECISION, armorSalesCount INTEGER, armorSalesTotal DOUBLE PRECISION, heroHireCount INTEGER, heroHireTotal DOUBLE PRECISION, tokenPrice DOUBLE PRECISION, favorHatches INTEGER, graceHatches INTEGER, boonHatches INTEGER, meditationCount INTEGER, meditationLevels BIGINT, summonCount INTEGER, darkSummonCount INTEGER, accessoryCreated INTEGER, armorCreated INTEGER, weaponCreated INTEGER, PRIMARY KEY (network, blockDate))')
            # user mgmt
            cur.execute('CREATE TABLE IF NOT EXISTS members (account VARCHAR(63) PRIMARY KEY, nonce INTEGER, generatedTimestamp INTEGER, expiresTimestamp INTEGER, lastLogin INTEGER)')
            cur.execute('CREATE TABLE IF NOT EXISTS payments (account VARCHAR(63), generatedTimestamp TIMESTAMP NOT NULL, txHash VARCHAR(127), token VARCHAR(63), amount DOUBLE PRECISION, previousExpires INTEGER, newExpires INTEGER, network VARCHAR(31), PRIMARY KEY (network, txHash), INDEX IX_pay_account (account))')
            cur.execute('CREATE TABLE IF NOT EXISTS sessions (sid VARCHAR(40) NOT NULL PRIMARY KEY, account VARCHAR(63) NOT NULL, expires FLOAT, INDEX IX_session_account (account))')
            cur.execute('CREATE TABLE IF NOT EXISTS wallets (account VARCHAR(63), wallet VARCHAR(63), PRIMARY KEY (account, wallet))')


def main():
    # Initialize database
    createDatabase()


if __name__ == "__main__":
	main()