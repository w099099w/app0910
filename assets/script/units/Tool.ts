export default class Tool{
    protected  static m_instance: Tool;
    private constructor(){
    
    }
    public static getInstance():Tool{
        if(!Tool.m_instance){
            Tool.m_instance = new Tool();
            return Tool.m_instance;
        }
        return Tool.m_instance;
    }
    public isPhoneNumber(tel):boolean{
        let reg =/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    }
}
