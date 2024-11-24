export class UserDto {
    fullName: string;
    email: string;
    password: string;
    invitationCode: number;
    constructor(fullName: string, email: string, password: string,invitationCode:number) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.invitationCode = invitationCode;
    }    
}
