
export default class Actor {
    Id: string;
    FirstName: string;
    LastName: number;
    YearsOfExperience: number;
    Age: number;
    MainGenere: string;

    constructor(baseActor: Actor){
        this.Id = baseActor.Id;
        this.FirstName = baseActor.FirstName;
        this.LastName = baseActor.LastName;
        this.Age = baseActor.Age;
        this.YearsOfExperience = baseActor.YearsOfExperience;
        this.MainGenere = baseActor.MainGenere;
    }
}