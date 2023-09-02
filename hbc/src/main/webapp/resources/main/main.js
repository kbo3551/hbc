/**
 * 공통 및 메인 함수
 */
 
/* ajax 함수 
*  ex) url:호출 url, params: 파라미터, callback(필수x):콜백, async(필수x): 비동기(true),동기(false)
*/
function fn_ajax( url, params, callback, async ){
	var dfd = $.Deferred();
	
	params = params ? params : new Object;	// params 인자 없을때도 호출할 수 있도록.
	
	if( async === undefined || typeof async !== 'boolean' ){
		async = true;
	}
	var returnObject = params;
	
	if( url !== null && url !== '' ){
		$.ajax({
			type: 'POST',
			url: url+'.do',
			dataType : 'json',
			data: returnObject,
			async : async,
			success : function(data){
			    console.log("fn_ajax - url:" + url );
				if( typeof callback === 'function' ){
					return callback( data );
				}
					
				dfd.resolve(data);
			} 
			, error : function(){
				console.log('error - url :', url);
				console.log('error - params :', params);
			  }
		});
	}
	
	return dfd.promise();
}

/**
 * 인자를 받아서 체크값이 빈값이 경우 true를 리턴 
 * @param param : 체크값
 * @returns boolean
 */
function fn_isNull(param){
    if ((null == param) || ('' == param) || (undefined === param) || ("undefined" === param) ) {
        return true;
    }
    return false;
}

/**
 * json형태의 list를 받아 selectbox의 option을 재정의 한다.
 * @param targetId : 옵션을 설정할 selectbox의 ID
 * @param jsonList : 옵션을 생성할 json 리스트
 * @param baseOtpYN : "전체옵션" 항목을 추가할지 여부.(Y:전체 옵션 추가.)
 * ex : gfn_setSelectBoxOpt( "L1_MENU_NM", comboTypeList, true )
 */    
function gfn_setSelectBoxOpt( targetId, jsonList, baseOtpYN ){
    var optTag = "";
    
    if( !fn_isNull(baseOtpYN) ){    baseOtpYN = true;    }    //기본값 전체
    if( baseOtpYN ){//전체선택 옵션 여부.
        optTag += ('<option value="">전체</option>');
    } else {
        optTag += ('<option value="">선택</option>');
    }
    
    $.each( jsonList ,function(index,el){
        optTag += ('<option value="'+el.value+'">'+el.text+'</option>');
    });
    
    $("#"+targetId).empty();
    $("#"+targetId).append(optTag);
    return true;
};

