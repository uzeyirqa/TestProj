const request = require("supertest");


const newVideo = {
    Name: "test",
    length: "120",
    Creator: `TEST`,
    Genere: "Action"
}
let videoID;


const baseUrl = 'http://127.0.0.1:2777';

describe("first Create the video", () => {
    it("create video", async () => {
        await request(baseUrl)
            .post("/v1/videos")
            .set("accept", "application/json")
            .set("Content-Type", "application/json")
            .send(newVideo)
            .expect("Content-Type", /json/)
            .then(data => {
                expect(data.status).toEqual(200);
                expect(data.body).toBeDefined();
                expect(data.body.Id).toBeDefined();
                // save this page id
                videoID = data.body.Id;
            })
        expect(videoID).toBeDefined();

    })

    it("Varify video exists", async () => {
        await request(baseUrl)
            .get(`/v1/videos/${videoID}`)
            .expect(200)
            .then(data => {
                expect(data.body).toBeDefined()
                expect(data.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "Name": "test",
                            "length": "120"
                        })
                    ])
                )
            })
    })
})

describe("Send Request for endpoints", () => {
    it("send request with Invalid data", async () => {
        await request(baseUrl)
            .post("/v1/effect")
            .set("accept", "application/json")
            .set("Content-Type", "application/json")
            .send({ "Effect": "newEffect" })
            .expect(500);
    

    await request(baseUrl)
        .post("/v1/effect")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({ "Id": videoID })
        .then(500);

})

it("send request with valid data", async () => {
    await request(baseUrl)
        .post("/v1/effect")
        .set("accept", "application/json")
        .send({
            "Effect": "newEffect",
            "Id": videoID
        })
        .expect(200);
})
    
})
