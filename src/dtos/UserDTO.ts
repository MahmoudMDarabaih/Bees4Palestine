export class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    invitationCode: string;
    constructor(firstName: string, lastName: string, email: string, password: string, invitationCode: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.invitationCode = invitationCode;
    }
}
