export class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    invitationCode: number;
    constructor(firstName: string, lastName: string, email: string, password: string, invitationCode: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.invitationCode = invitationCode;
    }
}
