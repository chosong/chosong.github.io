fp_onloadjs.push(function() {
	
	$('.pilot select[name="SearchType"]').change(function() {
		var searchtype = $('.pilot .searchtype').val();
		
		// // szLoginKey
		if(searchtype == 0)
		{
			var appnamedisplay = document.getElementsByClassName('appname');
			appnamedisplay[0].style.display = "";
			var channelnamedisplay = document.getElementsByClassName('channelname');
			channelnamedisplay[0].style.display = "";
			
		}
		// // szNickName
		if(searchtype == 1)
		{
			var appnamedisplay = document.getElementsByClassName('appname');
			appnamedisplay[0].style.display = "None";
			var channelnamedisplay = document.getElementsByClassName('channelname');
			channelnamedisplay[0].style.display = "None";
		}
		// // save Db 에서 찾아오기 szNickName
		if(searchtype == 2)
		{
			var appnamedisplay = document.getElementsByClassName('appname');
			appnamedisplay[0].style.display = "None";
			var channelnamedisplay = document.getElementsByClassName('channelname');
			channelnamedisplay[0].style.display = "None";
		}
	
    });

	// 원래 keyup이였는데 IE에서 한글 입력시 두번 호출되는 현상때문에 keypress로 변경하였다.
    $('.pilot .keyword').keypress(function(e) {
		
        switch(e.which)
        {
            case 13: // enter
            {
				$('.account_info_tb').empty();
				$('.pilot_info_tb').empty();
				$('.pilot_data').empty();
				$('.pilot_name').empty();
				$('.subboard').empty();
				$('body').data('pilotinfo', "");
				
                search_pilot();
            }
        }
    });
	
	$('.bt_Update').click(function() 
	{
		
		var _key_account  = ['szChannelName', 'szAppName', 'szLoginKey', '_id'];
		var _key_pilot  = ['szSession0', 'szSession1', 'nLevel', 'nExp', 'nGhem', 'nCash', 'nTotalCash', 'nTeam', 'nSTP', 'nTicket', 'nFP', 'nRemainChallengeReset_Cash', 'nRemainChallengeReset', 'nVIPLevel', 'nVIPPoint', 'nKeepAliveCnt', 'nKeepAliveIdx']
		
		var szLoginKey = get_LoginKey('szLoginKey');
		var szChannelName = get_AppName('szAppName');
		var szAppName = get_ChannelName('szChannelName');
					
					
		
		var SendUpdatePCInfo = {};
		SendUpdatePCInfo['m_PCInfo'] = $('body').data('pilotinfo');
		//var _UpdatePcinfo = {};
		console.log('SendUpdatePCInfo before', SendUpdatePCInfo);
		for( var _k in _key_pilot )
		{
			var _key = _key_pilot[_k];
			
			var szTempStr = "input[name='" + _key + "']";
			var TableVal = jQuery(szTempStr).val();
			SendUpdatePCInfo.m_PCInfo.m_Data[_key] = TableVal;
			
			
		}
		
		//console.log('SendUpdatePCInfo after', SendUpdatePCInfo);
		
		//console.log('_datadd', _data);
		
		
		var strTempProtocal = "./data/" + 'CM_Web_Dev_UpdatePCInfo' + ".json";
		$.getJSON(strTempProtocal, function(data) 
		{
			//$.consoleLog( data);
			
			
			
			data['MSGHeader'].szChannelName = szChannelName;
			data['MSGHeader'].szAppName = szAppName;
			data['MSGHeader'].szLoginKey = szLoginKey;
			
			
			data['m_Data'] = SendUpdatePCInfo;
			
			console.log("UpdatePCInfo data", data);
			
			$.msapi().load({
				params: {
					packet_name: 'CM_Web_Dev_UpdatePCInfo',
					m_Data: data
				},
				oncomp: function(result) {
					//refresh_equiplist(result);
				}
			});
		});
		return false;
	});
    $('.pilot_action_board button').click(action_button_event);

    //_test();
});

/**
 *
 * @param idx
 * @returns {*|jQuery}
 */
function get_publisher_name(idx)
{
    return $('.pilot .search_kind').find('option[value="'+idx+'"]').text()
}

function search_pilot()
{
	
	var _searchtype = $('.pilot .searchtype').val();
    var _keyword = $('.pilot .keyword').val();
    var _kind = $('.pilot .search_kind').val();
	var _appname = $('.pilot .appname').val();
    var _channelname = $('.pilot .channelname').val();
	//<select name="AppName" class="appname" style = "display:none">
	// var test = document.getElementsByClassName('appname');
	
	// test[0].style.display = "";
	
	//console.log("ddddd",document.getElementsByClassName('appname').style);
	//document.getElementsByClassName('appname').style;
	
	//$('.pilot .appname').style.display = "none";
    $('.pilot_list').empty();
	
	var SendData = {};
	var strTempProtocal = "./data/" + 'CM_Web_PCInfo_Get' + ".json";
	
	$.getJSON(strTempProtocal, function(data) 
	{		
		//console.log("CM_Web_PCInfo_Get data", data);
		data['MSGHeader'].szChannelName = _channelname;
		data['MSGHeader'].szAppName = _appname;
		data['MSGHeader'].szLoginKey = _keyword;
		
		data['m_Data'].szChannelName = _channelname;
		data['m_Data'].szAppName = _appname;
		data['m_Data'].szLoginKey = _keyword;
		data['m_Data'].szNickName = _keyword;
		
		data['m_Data'].nSearchType = _searchtype;
		
		SendData = data;
		
		//var zip = new JSZip();
		//zip.file("hello.txt", "Hello Worldzzz\n");
		//zip.file("nested/hello.txt", "Hello World\n");
		//zip.file("hello.txt").asText(); // "Hello World\n"
		//console.log("zzzz",zip.file("hello.txt").asText());
		//console.log("JSZip",JSZip);
		//if (JSZip.support) {
		//zip.file("hello.txt").asUint8Array(); // Uint8Array { 0=72, 1=101, 2=108, more...}
		//var hash = CryptoJS.MD5("Message");
		//console.log("hash",hash);
		//var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase", { mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.AnsiX923 });
		
		
		// var startTime = new Date();
		// var keySizeInBits  = slowAES.aes.keySize.SIZE_256;
		// var keySizeInBytes = keySizeInBits/8;
		// var mode           = slowAES.modeOfOperation.CBC;
		// //var iv             = "1234567890123456";
		// var iterations     = 2048;
		// var derivedKey     = null;
		// var _jonfile = {};
		// _jonfile.a = 1;
		// _jonfile.b = 2;

		// var vsvsvsvs = JSON.stringify(_jonfile);
		// var key = "H5K950P0CQam5J7g0Mla4k9i013R9qG4";
		// var iv = "H5K950P0CQam5J7g";
		
		// var mypbkdf2 = new PBKDF2("THE_DUMMY_PASSWORD_IS_RHUBARB", iv, iterations, keySizeInBytes);
		// console.log("mypbkdf2",mypbkdf2);
		 // var key = "H5K950P0CQam5J7g0Mla4k9i013R9qG4";
		 // //var iv = "H5K950P0CQam5J7g";
		 // var iv = "H6K960P0CQam5J7g";
		 // encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });
		 // var words = CryptoJS.enc.Utf8.parse(encrypted);
		 // var utf8  = CryptoJS.enc.Utf8.stringify(words);
		 // console.log("words",words)
		 // console.log("utf8",utf8)
		 // var words = CryptoJS.enc.Hex.parse(utf8);
	     // var hex   = CryptoJS.enc.Hex.stringify(words);
		 // console.log("words",words)
		 // console.log("hex",hex)
		 // utf8 += hex;
		 // console.log("utf8",utf8)
		 // console.log("encrypted",encrypted)
		//var result_callback = function(key) 
		//{
		  // console.log("Callback");
		  // derivedKey = key;
		  // console.log("The key " + derivedKey);
		  // var encryptedByteArray = encryptString("HITHERE", derivedKey, iv);
		  // console.log("The encrypted string " + encryptedByteArray);
		  // var decryptedString = decryptString(encryptedByteArray, derivedKey, iv);
		  // console.log("The decrypted string " + decryptedString);
		//};
		
		//mypbkdf2.deriveKey(function(){}, result_callback);
		
		
		
		
		  // console.log("Callback");
		  // derivedKey = key;
		  // console.log("The key " + derivedKey);
		  // var encryptedByteArray = encryptString(vsvsvsvs, derivedKey, iv);
		  // console.log("The encrypted string " + encryptedByteArray);
		  // var szutf8 = CryptoJS.enc.Utf8.parse(encryptedByteArray);
		  // console.log("szutf8", szutf8);
		  // var words = CryptoJS.enc.Hex.parse("3230312c3136362c3138332c3135362c3133372c3138362c39382c3230352c3137382c31302c34392c35352c37352c3137372c3232312c3737");
		  // console.log("words", words);
		  // var hex   = CryptoJS.enc.Hex.stringify(words);
		  // console.log("hex", hex); 
		  // var decryptedString = decryptString(encryptedByteArray, derivedKey, iv);
		  // console.log("The decrypted string " + decryptedString);
		  
		//console.log("mypbkdf2.deriveKey",mypbkdf2.deriveKey);
		$.msapi().load({
			
			params:{
				packet_name: 'CM_Web_PCInfo_Get',
				m_Data: SendData
			},
			oncomp: function(result) {
				
				if(result[0].MSGHeader.nCmd == 90000)
				{
					alert('Not Find User');
					return;
				}
				
				for( var Key in result )
				{
					if(_searchtype == 0)
					{
						var m_PCInfo = result[Key].m_Data.m_PCInfo;
					
						var _text = '';
						
						var _li = $('<li/>');
						_text += m_PCInfo.szAppName;
						_text += ' | ' + m_PCInfo['szChannelName'];
					

						_text += ' | ' + m_PCInfo['szLoginKey'];
						_text += ' | ' + m_PCInfo['_id'];
						_text += ' (Lv.' + m_PCInfo.m_Data['nLevel'] + ')';

						_li.attr('szChannelName', m_PCInfo['szChannelName'])
						.attr('szAppName', m_PCInfo['szAppName'])
						.attr('szLoginKey', m_PCInfo['szLoginKey'])
						.append(_text);

						_li.addClass('color');
						// if(_d['nSlotIdx'] == -1) _li.addClass('del');

					    _li.appendTo($('.pilot_list'));
					}
					else if(_searchtype == 1)
					{
						for( var NickNameKey in result[Key].m_Data.m_PCInfo )
						{
							var m_PCInfo = result[Key].m_Data.m_PCInfo[NickNameKey];
					
							var _text = '';
							
							var _li = $('<li/>');
							_text += m_PCInfo.szAppName;
							_text += ' | ' + m_PCInfo['szChannelName'];
						

							_text += ' | ' + m_PCInfo['szLoginKey'];
							_text += ' | ' + m_PCInfo['_id'];
							_text += ' (Lv.' + m_PCInfo.m_Data['nLevel'] + ')';

							_li.attr('szChannelName', m_PCInfo['szChannelName'])
								.attr('szAppName', m_PCInfo['szAppName'])
								.attr('szLoginKey', m_PCInfo['szLoginKey'])
								.append(_text);

							_li.addClass('color');
							// if(_d['nSlotIdx'] == -1) _li.addClass('del');

							_li.appendTo($('.pilot_list'));
						}
					}
					else if(_searchtype == 2)
					{
						console.log("result[Key].m_Data.m_PCInfo", result[Key].m_Data.m_PCInfo);
						
						var m_PCInfo = result[Key].m_Data.m_PCInfo;
				
						var _text = '';
						
						var _li = $('<li/>');
						_text += m_PCInfo.szAppName;
						_text += ' | ' + m_PCInfo['szChannelName'];
					

						_text += ' | ' + m_PCInfo['szLoginKey'];
						_text += ' | ' + m_PCInfo['_id'];
						_text += ' (Lv.' + m_PCInfo.m_Data['nLevel'] + ')';

						_li.attr('szChannelName', m_PCInfo['szChannelName'])
							.attr('szAppName', m_PCInfo['szAppName'])
							.attr('szLoginKey', m_PCInfo['szLoginKey'])
							.append(_text);

						_li.addClass('color');
						// if(_d['nSlotIdx'] == -1) _li.addClass('del');

						_li.appendTo($('.pilot_list'));
						$('body').data('pilotinfo', result[Key].m_Data.m_PCInfo);
					}
				}
				
				$('.pilot_list li').click(function() {
					var szChannelName = $(this).attr('szChannelName');
					var szAppName = $(this).attr('szAppName');
					var szLoginKey = $(this).attr('szLoginKey');
					
					//refresh_User_Info(m_PCInfo['szChannelName'], m_PCInfo.szAppName, m_PCInfo['szLoginKey']);
					refresh_User_Info(szChannelName, szAppName, szLoginKey);
					//console.log("asdfadloginkey", m_PCInfo['szLoginKey']);
				});
			}
		})
	});
}

function refresh_User_Info(szChannelName, szAppName, szLoginKey)
{
    var _key_account  = ['szChannelName', 'szAppName', 'szLoginKey', '_id'];
    var _key_pilot  = ['szSession0', 'szSession1', 'nLevel', 'nExp', 'nGhem', 'nCash', 'nTotalCash', 'nTeam', 'nSTP', 'nTicket', 'nFP', 'nRemainChallengeReset_Cash', 'nRemainChallengeReset', 'nVIPLevel', 'nVIPPoint', 'nKeepAliveCnt', 'nKeepAliveIdx']
	
    $('.account_info_tb').empty();
    $('.pilot_info_tb').empty();
    $('.pilot_data').empty();
    $('.pilot_name').empty();
    $('.subboard').empty();
	
	var SendData = {};
	var strTempProtocal = "./data/" + 'CM_Web_PCInfo_Get' + ".json";
	
	var searchtype = $('.pilot .searchtype').val();
	
	if(searchtype == 2)
	{
		var _data = $('body').data('pilotinfo');
		
		//$('body').data('pilotinfo', _data);
		

		$('.pilot_name').append(_data['szNickName']);

		refresh_detail_info('title', _data);

		for( var _k in _key_account )
		{
			var _key = _key_account[_k];

			var _tr = $('<tr/>');
			
			var _th = $('<th/>').append(_key);
			var _td = $('<td/>').append(_data[_key]).attr('name', _key);

			_tr.append(_th).append(_td);
			
			$('.account_info_tb').append(_tr);
		}

		for( var _k in _key_pilot )
		{
			var _key = _key_pilot[_k];

			var _tr = $('<tr/>');
			var _th = $('<th/>').append(_key);
			
			var _td = set_InputBox(_key, _data);
			

			_tr.append(_th).append(_td)//.append(_tdd)//.append(_tddd);

			$('.pilot_info_tb').append(_tr);
		}
	}
	else
	{
		$.getJSON(strTempProtocal, function(data) 
		{
			//console.log("CM_Web_PCInfo_Get data", data);
			
			data['MSGHeader'].szChannelName = szChannelName;
			data['MSGHeader'].szAppName = szAppName;
			data['MSGHeader'].szLoginKey = szLoginKey;
			
			data['m_Data'].szChannelName = szChannelName;
			data['m_Data'].szAppName = szAppName;
			data['m_Data'].szLoginKey = szLoginKey;
			
			
			var _searchtype = $('.pilot .searchtype').val();
			data['m_Data'].nSearchType = 0;
			
			SendData = data;
			
			
			$.msapi().load({
				params:{
					packet_name: 'CM_Web_PCInfo_Get',
					m_Data: SendData
				},
				oncomp: function(result) {
					
					var _data = result[0].m_Data.m_PCInfo;
					
					$('body').data('pilotinfo', _data);
					

					$('.pilot_name').append(_data['szNickName']);

					refresh_detail_info('title', _data);

					for( var _k in _key_account )
					{
						var _key = _key_account[_k];

						var _tr = $('<tr/>');
						
						var _th = $('<th/>').append(_key);
						var _td = $('<td/>').append(_data[_key]).attr('name', _key);

						_tr.append(_th).append(_td);
						
						$('.account_info_tb').append(_tr);
					}

					for( var _k in _key_pilot )
					{
						var _key = _key_pilot[_k];

						var _tr = $('<tr/>');
						var _th = $('<th/>').append(_key);
						//var _td = $('<td/>').append(_data.m_Data[_key]).attr('name', _key);
						//var _td = $('<td/>')
						//var _tdd = $('<input type="search" name="search" class="keywords" />').append(_data.m_Data[_key]).attr('name', _key);
						//var _tdd = $('<input type="search" name="szSub0_VarName" value= "ssss" class="keywords") />')
						//var _tddd = $('<input.form-control(name="szVarValue", value= "ssss")/>');
						
						var _td = set_InputBox(_key, _data);
						

						_tr.append(_th).append(_td)//.append(_tdd)//.append(_tddd);

						$('.pilot_info_tb').append(_tr);
					}
					
					
				}
			});
		});
	}
	
}
function set_InputBox(Key, data)
{
	var szTemp;
	var szTempStr = '#{m_PCInfo.'+ Key +'}'
	//console.log("Key", Key);
	//console.log ("set_InputBox data",data);
	//szTemp = '<input type="search" name="'+ Key +'" value= "'+val + '" class="'+ Key +'") />';
	
	szTemp = '<input type="search" name="'+ Key +'" value= "'+ data.m_Data[Key] + '" class="'+ Key +'") />';
	//console.log ("szTemp",szTemp);
	return szTemp;
}

function get_LoginKey(szLoginKey)
{
    if( $('body').data('pilotinfo') == null ) return null;
    return $('body').data('pilotinfo')[szLoginKey];
}

function get_AppName(szAppName)
{
    if( $('body').data('pilotinfo') == null ) return null;
    return $('body').data('pilotinfo')[szAppName];
}

function get_ChannelName(szChannelName)
{
    if( $('body').data('pilotinfo') == null ) return null;
    return $('body').data('pilotinfo')[szChannelName];
}

function action_button_event()
{
    //var _acc = get_pilotinfo('nAccountNum');
	var _szLoginKey = get_LoginKey('szLoginKey');
	var _szChannelName = get_AppName('szAppName');
	var _szAppName = get_ChannelName('szChannelName');
		
    $('.subboard').empty();

    if(_szLoginKey == null) return;
	if(_szChannelName == null) return;
	if(_szAppName == null) return;

    switch($(this).html())
    {
        case 'EquipList':
        {
            click_equiplist(_szLoginKey, _szChannelName, _szAppName);
        } break;

        case 'PlayCardInven':
        {
            click_PalyCardInvenList(_szLoginKey, _szChannelName, _szAppName);
        } break;

        case 'GiftBox':
        {
            click_giftbox(_szLoginKey, _szChannelName, _szAppName);
        } break;

        case 'CardDeck':
        {
            click_CardDeck(_szLoginKey, _szChannelName, _szAppName);
        } break;

        case 'Inven':
        {
            click_inven(_szLoginKey, _szChannelName, _szAppName);
        } break;

        case 'UserLog':
        {
            click_userlog(_szLoginKey, _szChannelName, _szAppName);
        } break;
		case 'ReceiptLog':
        {
            click_receiptlog(_szLoginKey, _szChannelName, _szAppName);
        } break;
		case 'DevUpdatePCInfo':
        {
            click_devupdatepcinfo(_szLoginKey, _szChannelName, _szAppName);
        } break;
    }

    resize_container();

    return false;
}

function click_equiplist(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_item.html', $('.subboard'), function() {

    });
}

function click_PalyCardInvenList(_szLoginKey, _szChannelName, _szAppName)
{	
    $.loadHTMLFile('subpage/board/_palycardinven.html', $('.subboard'), function() {

    });
}

function click_giftbox(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_giftbox.html', $('.subboard'), function() {

    });
}

function click_CardDeck(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_carddeck.html', $('.subboard'), function() {

    });
}

function click_inven(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_inven.html', $('.subboard'), function() {

    });
}

function click_userlog(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_userlog.html', $('.subboard'), function() {

    });
}

function click_receiptlog(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_receiptlog.html', $('.subboard'), function() {

    });
}
function click_devupdatepcinfo(_szLoginKey, _szChannelName, _szAppName)
{
    $.loadHTMLFile('subpage/board/_devupdatepcinfo.html', $('.subboard'), function() {

    });
}
function _test()
{
    $(".keyword").val('xozu');
    search_pilot();
}

function hexStringToByteArray(s)
  {
    var r = Array(s.length/2);
    for (var i = 0; i < s.length; i+=2) {
        r[i/2] = parseInt(s.substr(i, 2), 16);
    }
    return r;
  }
 
  function encryptString(plainText, key, iv)
  {
    var bytesToEncrypt = cryptoHelpers.convertStringToByteArray(plainText);
    return encryptBytes(bytesToEncrypt, key, iv);
  }
 
  function decryptString(encryptedByteArray, key, iv)
  {
    var bytes = decryptBytes(encryptedByteArray, key, iv);
    var decryptedString = cryptoHelpers.convertByteArrayToString(bytes);
    return decryptedString;
  }
 
  function encryptBytes(plainText, key, iv)
  {
    var t = typeof plainText;
    if (t == "string") {
        plainText = hexStringToByteArray(plainText);
    }
    var result = slowAES.encrypt(plainText, slowAES.modeOfOperation.CBC, key, iv);
    return result;
  }
 
  function decryptBytes(encryptedByteArray, key, iv)
  {
    var result = slowAES.decrypt(encryptedByteArray, slowAES.modeOfOperation.CBC, key, iv);
    return result;
  }