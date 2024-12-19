export class CreateUserDto {
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


export class GetUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    invitationCode: string;
    dob: Date;
    stars: number;
    profileImageUrl: string;
    country: string;
    role: 'admin' | 'user';


    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        invitationCode: string,
        dob: Date,
        stars: number,
        profileImageUrl: string,
        country: string,
        role: 'admin' | 'user',


    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.invitationCode = invitationCode;
        this.dob = dob;
        this.stars = stars;
        this.profileImageUrl = profileImageUrl;
        this.country = country;
        this.role = role;

    }
}