const request = require("supertest");


const baseUrl = 'http://127.0.0.1:2777';
const newActor = {
    FirstName: `testName`,
    LastName: `TEST`,
    Age: "30",
    YearsOfExperience: "10",
    MainGenere: "action"
};

const newVideo = {
    Name: `test`,
    length: "120",
    Creator: `TEST`,
    Genere: "Action"
}

let actorID;
let videoID;


describe("Crud Test for actor", () => {
    it("create actor", async () => {
        await request(baseUrl)
            .post("/v1/actors")
            .set("accept", "application/json")
            .set("Content-Type", "application/json")
            .send(newActor)
            .expect("Content-Type", /json/)
            .then(data => {
                expect(data.status).toEqual(200);
                expect(data.body).toBeDefined();
                expect(data.body.Id).toBeDefined();
                // save this actor id
                actorID = data.body.Id;
            })
        expect(actorID).toBeDefined();
    })

    it("Read Actor", async () => {
        await request(baseUrl)
            .get(`/v1/actors/${actorID}`)
            .expect(200)
            .then(data => {
                expect(data.body).toBeDefined()
                expect(data.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "FirstName": "testName",
                            "LastName": "TEST"
                        })
                    ])
                )
            })
    })

    it("Update Actor", async () => {
        await request(baseUrl)
            .put(`/v1/actors`)
            .set("accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                "Id": actorID,
                "FirstName": "Test1",
                "LastName": "Test1"
            })
            .expect(200);
    })

    it("Check changes Actor", async () => {
        await request(baseUrl)
            .get(`/v1/actors/${actorID}`)
            .expect(200)
            .then(data => {
                expect(data.body).toBeDefined()
                expect(data.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "FirstName": "Test1",
                            "LastName": "Test1"
                        })
                    ])
                )
            })
    })

    it("Delete Actor", async () => {
        await request(baseUrl)
            .delete(`/v1/actors/${actorID}`)
            .expect(200)
    })
});
describe("Crud Test for video", () => {
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
                // save this video id
                videoID = data.body.Id;
            })
        expect(videoID).toBeDefined();
    })

    it("Get video", async () => {
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

    it("Update videos", async () => {
        await request(baseUrl)
            .put(`/v1/videos`)
            .set("accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                "Id": videoID,
                "Name": "Newtest",
                "length": "140"
            })
            .expect(200);

        // 5. Check that the changes have been made
        await request(baseUrl)
            .get(`/v1/videos/${videoID}`)
            .expect(200)
            .then(data => {
                expect(data.body).toBeDefined()
                expect(data.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "Name": "Newtest",
                            "length": "140"
                        })
                    ])
                )
            });
    })

    it("Delete video", async () => {
        await request(baseUrl)
            .delete(`/v1/videos/${videoID}`)
            .expect(200)
    })
})
