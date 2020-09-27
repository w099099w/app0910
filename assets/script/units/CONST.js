const className = "org/cocos2dx/javascript/AppActivity";

const BUTTON_STATE = cc.Enum({
    OFF: 0,
    ON: 1,
});

const CHANGE_NAME_RESULT = cc.Enum({
    NAME_LENGTH_ERROR:0,
    NAME_CHECK_ERROR:1,
    SUCCESS:2,    
    FAILED:3
});
const RESETPD_RESULT = cc.Enum({
    FAILED:0,
    PASSWORD_LENGTH_NONE:1,
    PASSWORD_LENGTH_ERROR:2,
    PASSWORD_NO_SAME:3,
    PASSWORD_ERROR:4,
    SUCCESS:5,
});
const BGM_CODE = cc.Enum({
    BGM_NONE:0,
    BGM_PASSPORT:1,
    BGM_HALL:2,
})
const EFF_CODE = cc.Enum({
   
});
const LOGIN_METHOD = cc.Enum({
    PASSWORD:0,
    PHONE_VERIFY:1
});

const REALNAME_RESULT = cc.Enum({
    FAILED:0,
    SUCCESS:1,
    REALNAME_LENGTH_NONE:2, 
    ID_LENGTH_NONE:3,
    ID_CHECK_ERR:4,
    VERIFY_FAILED:5,
})
const MONEYFLOW_TYPE = cc.Enum({
    WECHAT:0,
	ALIPAY:1,
	SYSTEM:2,
});
const PAY_TYPE = cc.Enum({
    RECHANGE:0,
    CASHOUT:1,
    TRANSFER:2,
    GAMEBET:3,
    GAMEWIN:4,
    SYSTEMADD:5,
    SYSTEMSUB:6,
    BETBACK:7
});