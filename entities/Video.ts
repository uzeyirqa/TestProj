
export default class Video {
    Id: string;
    Name: string;
    length: number; // in minutes
    Creator: string;
    Genere: string;

    constructor(baseVideo: Video){
        this.Id = baseVideo.Id;
        this.Name = baseVideo.Name;
        this.length = baseVideo.length;
        this.Creator = baseVideo.Creator;
        this.Genere = baseVideo.Genere;
    }
}