#!/usr/bin/env python3
from flask import Flask, request, redirect, url_for
from flask import render_template
from markupsafe import escape
from web3 import Web3
import db
import utils
import payment

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('home.html')

@app.route("/hero")
@app.route("/heroes")
def heroes():
    return render_template('heroes.html')

@app.route("/pet")
@app.route("/pets")
def pets():
    return render_template('pets.html')

@app.route("/weapon")
@app.route("/accessory")
@app.route("/equipment")
def equipment():
    return render_template('equipment.html')

@app.route("/hero/<heroid>")
def hero_page(heroid=None):
    heroIdLong = utils.translateHeroId(escape(heroid))
    tabOption = escape(request.args.get('tab', 'events'))
    if tabOption not in ['events','levels','sales','summons']:
        tabOption = 'events'

    if type(heroIdLong) is int or heroIdLong.isnumeric():
        return render_template('hero.html', heroIdLong=heroIdLong, heroIdShort=heroid, activeTab=tabOption)
    else:
        return render_template('hero.html', heroIdLong=23257, heroIdShort=23257, activeTab=tabOption)

@app.route("/pet/<petid>")
def pet_page(petid=None):
    petIdLong = utils.translateHeroId(escape(petid))
    tabOption = escape(request.args.get('tab', 'events'))
    if tabOption not in ['events','sales']:
        tabOption = 'events'

    if type(petIdLong) is int or petIdLong.isnumeric():
        return render_template('pet.html', petIdLong=petIdLong, petIdShort=petid, activeTab=tabOption)
    else:
        return render_template('pet.html', petIdLong=23257, petIdShort=23257, activeTab=tabOption)

@app.route("/weapon/<weaponid>")
def weapon_page(weaponid=None):
    weaponIdLong = utils.translateHeroId(escape(weaponid))
    tabOption = escape(request.args.get('tab', 'events'))
    if tabOption not in ['events','sales']:
        tabOption = 'events'

    if type(weaponIdLong) is int or weaponIdLong.isnumeric():
        return render_template('weapon.html', equipmentIdLong=weaponIdLong, equipmentIdShort=weaponid, activeTab=tabOption)
    else:
        return render_template('weapon.html', equipmentIdLong=23257, equipmentIdShort=23257, activeTab=tabOption)

@app.route("/accessory/<accessoryid>")
def accessory_page(accessoryid=None):
    accessoryIdLong = utils.translateHeroId(escape(accessoryid))
    tabOption = escape(request.args.get('tab', 'events'))
    if tabOption not in ['events','sales']:
        tabOption = 'events'

    if type(accessoryIdLong) is int or accessoryIdLong.isnumeric():
        return render_template('accessory.html', equipmentIdLong=accessoryIdLong, equipmentIdShort=accessoryid, activeTab=tabOption)
    else:
        return render_template('accessory.html', equipmentIdLong=23257, equipmentIdShort=23257, activeTab=tabOption)

@app.route("/hero/<heroid>/history/<hevent>", methods=['GET','POST'])
def hero_history(heroid=None, hevent=None):
    heroid = utils.translateHeroId(escape(heroid))
    if type(heroid) is not int and not heroid.isnumeric():
        app.logger.warn('Invalid hero id for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid hero id" }

    hevent = escape(hevent)

    orderOption = escape(request.args.get('order', ''))

    if hevent == 'levelup':
        return { "results": db.getLevelUps(heroid, orderOption) }
    elif hevent == 'life':
        return { "results": db.getLifeEvents(heroid, orderOption) }
    elif hevent == 'sales':
        return { "results": db.getSales(heroid, orderOption) }
    elif hevent == 'summons':
        return { "results": db.getSummons(heroid, orderOption) }
    else:
        app.logger.warn('Invalid event type for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid event type" }

@app.route("/pet/<petid>/history/<hevent>", methods=['GET','POST'])
def pet_history(petid=None, hevent=None):
    petid = utils.translateHeroId(escape(petid))
    if type(petid) is not int and not petid.isnumeric():
        app.logger.warn('Invalid pet id for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid pet id" }

    hevent = escape(hevent)

    orderOption = escape(request.args.get('order', ''))

    if hevent == 'life':
        return { "results": db.getPetLifeEvents(petid, orderOption) }
    elif hevent == 'sales':
        return { "results": db.getPetSales(petid, orderOption) }
    else:
        app.logger.warn('Invalid event type for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid event type" }

@app.route("/weapon/<weaponid>/history/<hevent>", methods=['GET','POST'])
def weapon_history(weaponid=None, hevent=None):
    weaponid = utils.translateHeroId(escape(weaponid))
    if type(weaponid) is not int and not weaponid.isnumeric():
        app.logger.warn('Invalid weapon id for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid weapon id" }

    hevent = escape(hevent)

    orderOption = escape(request.args.get('order', ''))

    if hevent == 'life':
        return { "results": db.getEquipmentLifeEvents(weaponid, 'weapon', orderOption) }
    elif hevent == 'sales':
        return { "results": db.getEquipmentSales(weaponid, 'weapon', orderOption) }
    else:
        app.logger.warn('Invalid event type for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid event type" }

@app.route("/accessory/<accessoryid>/history/<hevent>", methods=['GET','POST'])
def accessory_history(accessoryid=None, hevent=None):
    accessoryid = utils.translateHeroId(escape(accessoryid))
    if type(accessoryid) is not int and not accessoryid.isnumeric():
        app.logger.warn('Invalid accessory id for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid accessory id" }

    hevent = escape(hevent)

    orderOption = escape(request.args.get('order', ''))

    if hevent == 'life':
        return { "results": db.getEquipmentLifeEvents(accessoryid, 'accessory', orderOption) }
    elif hevent == 'sales':
        return { "results": db.getEquipmentSales(accessoryid, 'accessory', orderOption) }
    else:
        app.logger.warn('Invalid event type for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid event type" }

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/auth")
def auth():
    account = request.args.get("account", "")
    signature = request.args.get("signature", "")
    # escape input to prevent sql injection
    account = db.dbInsertSafe(account)
    signature = db.dbInsertSafe(signature)

    print('Content-type: text/json\n')
    if not Web3.is_address(account):
        sessionResult = 'Error: That is not a valid address.  Make sure you enter the version that starts with 0x'
    else:
        # Ensure consistent checksum version of address
        account = Web3.to_checksum_address(account)
        sessionResult = db.getSession(account, signature)

    return { "sid" : sessionResult }

@app.route("/login")
def login():
    account = request.args.get("account", "")
    sid = request.args.get('sid', '')
    # escape input to prevent sql injection
    account = db.dbInsertSafe(account)
    sid = db.dbInsertSafe(sid)
    # Get a session
    print('Content-type: text/json\n')
    if not Web3.is_address(account):
        nonceResult = 'Error: That is not a valid address.  Make sure you enter the version that starts with 0x'
        return { "error" : str(nonceResult) }
    else:
        # Ensure consistent checksum version of address
        account = Web3.to_checksum_address(account)

        if sid != '':
            sess = db.checkSession(sid)
            if sess == account:
                return { "sid" : sid }
            else:
                nonceResult = db.getAccountNonce(account)
                return { "nonce" : str(nonceResult) }
        else:
            nonceResult = db.getAccountNonce(account)
            return { "nonce" : str(nonceResult) }

@app.route("/logout")
def logout():
    account = request.args.get("account", "")
    sid = request.args.get('sid', '')
    # escape input to prevent sql injection
    account = db.dbInsertSafe(account)
    sid = db.dbInsertSafe(sid)

    loginState = 0

    sess = db.checkSession(sid)
    if (sess != ''):
        loginState = 1
        currentUser = sess

    print('Content-type: text/json\n')
    if not Web3.is_address(account):
        logoutResult = 'Error: That is not a valid address.  Make sure you enter the version that starts with 0x'
    else:
        # Ensure consistent checksum version of address
        account = Web3.to_checksum_address(account)
        if loginState > 0:
            conn = db.aConn()
            cursor = conn.cursor()
            updatestr = 'DELETE FROM sessions WHERE account=%s AND sid=%s'
            cursor.execute(updatestr, (account, sid))
            cursor.close()
            conn.close()
            logoutResult = 'logout complete'
        else:
            logoutResult = 'Error: session was not valid'

    return { "result" : str(logoutResult) }

@app.route("/player")
def member_connect():
    secondsLeft = -1
    loginState = readAccount(request.args, request.cookies)
    # get subscription status
    if loginState[0] > 0:
        memberStatus = db.getMemberStatus(loginState[1])
        memberState = memberStatus[0]
        secondsLeft = memberStatus[1]
        walletList = memberStatus[3]
    else:
        memberState = 0
        walletList = []
    return render_template('connect.html', memberState=memberState, memberAccount=loginState[1], secondsLeft=secondsLeft, expiryDescription=utils.timeDescription(secondsLeft), playerWallets=walletList)

@app.route("/player/<playerid>")
def player_page(playerid=None):
    secondsLeft = -1
    loginState = readAccount(request.args, request.cookies)
    # get subscription status
    if loginState[0] > 0:
        memberStatus = db.getMemberStatus(loginState[1])
        memberState = memberStatus[0]
        secondsLeft = memberStatus[1]
    else:
        memberState = 0

    tabOption = escape(request.args.get('tab', 'events'))
    if tabOption not in ['events','levels','sales','summons','hatches']:
        tabOption = 'events'

    if Web3.is_address(playerid):
        playerid = Web3.to_checksum_address(escape(playerid))
        return render_template('player.html', playerId=playerid, activeTab=tabOption, memberState=memberState, memberAccount=loginState[1], secondsLeft=secondsLeft)
    else:
        return render_template('player.html', playerId='0x', activeTab=tabOption, memberState=memberState, memberAccount=loginState[1], secondsLeft=secondsLeft)

@app.route("/playerfeed/<playerid>")
def player_feed(playerid=None):
    secondsLeft = -1
    loginState = readAccount(request.args, request.cookies)
    # get subscription status
    if loginState[0] > 0:
        memberStatus = db.getMemberStatus(loginState[1])
        memberState = memberStatus[0]
        secondsLeft = memberStatus[1]
    else:
        memberState = 0

    if Web3.is_address(playerid):
        playerid = Web3.to_checksum_address(escape(playerid))
        return render_template('feed.html', playerId=playerid, memberState=memberState, memberAccount=loginState[1], secondsLeft=secondsLeft)
    else:
        return render_template('feed.html', playerId='0x', memberState=memberState, memberAccount=loginState[1], secondsLeft=secondsLeft)

@app.route("/player/<playerid>/history/<hevent>", methods=['GET','POST'])
def player_history(playerid=None, hevent=None):
    if not Web3.is_address(playerid):
        app.logger.warn('Invalid player id for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid player id" }
    else:
        playerid = Web3.to_checksum_address(escape(playerid))

    loginState = readAccount(request.args, request.cookies)
    # get subscription status
    if loginState[0] > 0:
        memberStatus = db.getMemberStatus(loginState[1])
        memberState = memberStatus[0]
    else:
        memberState = 0
    if loginState[1] != playerid:
        return { "result": [], "error": "Wallet does not match account address."}
    if memberState < 2:
        return { "results": [], "error": "Active subscription required."}

    hevent = escape(hevent)
    orderOption = escape(request.args.get('order', 'desc'))
    limitOption = request.args.get('limit', '0')
    if not limitOption.isnumeric():
        limitOption = 0
    else:
        limitOption = int(limitOption)

    if hevent == 'levelup':
        return { "results": db.getPlayerLevelUps(playerid, orderOption, limitOption) }
    elif hevent == 'life':
        return { "results": db.getPlayerLifeEvents(playerid, orderOption, limitOption) }
    elif hevent == 'sales':
        return { "results": db.getPlayerSales(playerid, orderOption, limitOption) }
    elif hevent == 'purchases':
        return { "results": db.getPlayerPurchases(playerid, orderOption, limitOption) }
    elif hevent == 'summons':
        return { "results": db.getPlayerSummons(playerid, orderOption, limitOption) }
    elif hevent == 'hatches':
        return { "results": db.getPlayerHatches(playerid, orderOption, limitOption) }
    else:
        app.logger.warn('Invalid event type for history call: {0}'.format(hevent))
        return { "results": [], "error": "Invalid event type" }

@app.route("/addWallet", methods=['POST'])
def add_wallet():
    loginState = readAccount(request.args, request.cookies)
    wallet = request.args.get('wallet','')
    # attempt add if logged in
    if loginState[0] > 0:
        if Web3.is_address(wallet):
            wallet = Web3.to_checksum_address(escape(wallet))
            ud = db.addWallet(loginState[1], wallet)
            if ud > 0:
                result = { "result": ud }
            elif ud == -1:
                result = { "result": ud, "error": "Too many wallets added"}
            else:
                result = { "result": ud, "error": "Wallet is already in list"}
        else:
            result = { "result": 0, "error": "Invalid address" }
    else:
        result = { "result": 0, "error": "Must be logged in" }

    return result

@app.route("/removeWallet", methods=['POST'])
def remove_wallet():
    loginState = readAccount(request.args, request.cookies)
    wallet = request.args.get('wallet','')
    # attempt removal if logged in
    if loginState[0] > 0:
        if Web3.is_address(wallet):
            wallet = Web3.to_checksum_address(escape(wallet))
            ud = db.removeWallet(loginState[1], wallet)
            if ud > 0:
                result = { "result": ud }
            else:
                result = { "result": ud, "error": "Unknown failure" }
        else:
            result = { "result": 0, "error": "Invalid address" }
    else:
        result = { "result": 0, "error": "Must be logged in" }

    return result

@app.route("/validatePayment", methods=['POST'])
def validate_payment():
    result = payment.validatePayment(request.args.get('network', ''), request.args.get('account', ''), request.args.get('txHash', ''))
    return result


@app.errorhandler(404)
def page_not_found(error):
    return render_template('missing.html'), 404

def readAccount(reqArgs, C):
    useCookies = True
    account = ''
    if useCookies:
        try:
            account = C['selectedAccount']
        except KeyError:
            account = reqArgs.get('account', '')
        try:
            sid = C['sid-{0}'.format(account)]
        except KeyError:
            sid = reqArgs.get('sid', '')
    else:
        sid = reqArgs.get('sid', '')
        account = reqArgs.get('account', '')

    sid = db.dbInsertSafe(sid)
    loginState = 0
    if sid != '' and Web3.is_address(account):
        account = Web3.to_checksum_address(account)
        sess = db.checkSession(sid)
        if sess == account:
            loginState = 1
    return [loginState, account]
