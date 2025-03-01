import {setDB} from "../src/db/db";
import {req} from "./test-helpers";
import {HARDCODE} from "../src/hardcode";
import {OutputErrorsType} from "../src/input-output-types/outputErrorsType";
import {OutputVideoType} from "../src/input-output-types/videoTypes";
import exp = require("constants");


describe(HARDCODE.PATH.VIDEOS, ()=> {
    let newVideo: OutputVideoType | undefined = undefined;


    beforeAll(async () => { // очистка базы данных перед началом тестирования
             await req.delete(`${HARDCODE.PATH.TESTING}/all-data`).expect(HARDCODE.HTTP_STATUSES.NoContent_204)
         });

    it('get empty array. without videos', async () => {
        await req.get(HARDCODE.PATH.VIDEOS).expect([]);
    })

    it('post dont create with incorrect input datas. author, title, availableResolution', async () => {
        await req.post(HARDCODE.PATH.VIDEOS).send({
            title: '   ',
            author: 2,
            availableResolutions: ['P480', 1, 'P321']
            }).expect(HARDCODE.HTTP_STATUSES.BadRequest_400, {
                errorsMessages: [{
                    field: 'availableResolution',
                    message: 'error!!!'
                }, {
                    field: 'title',
                    message: 'error!!!'
                },
                    {
                    field: 'author',
                    message: 'error!!!'
                }]
        } as OutputErrorsType);

        await req.get(HARDCODE.PATH.VIDEOS).expect([])
    });

    it('POST will be create video', async() => {
        const reqBodyVideo = {
            title: 'video1',
            author: 'John',
            availableResolutions: ["P480"]
        };

        const res = await req.post(HARDCODE.PATH.VIDEOS).send(reqBodyVideo).expect(HARDCODE.HTTP_STATUSES.Created_201);

        newVideo = res.body;

        expect(newVideo).toMatchObject(reqBodyVideo);

        await req.get(HARDCODE.PATH.VIDEOS).expect([newVideo])
    });



    it('NOT GET video with incorrect id', async() => {
        await req.get(`${HARDCODE.PATH.VIDEOS}/999`).expect(HARDCODE.HTTP_STATUSES.NotFound_404)
    })
    it('GET video with correct id', async() => {
        await req.get(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(newVideo!)
    })

    it('NOT PUT video by incorrect id', async() => {
        await req.put(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(HARDCODE.HTTP_STATUSES.NotFound_404)
    })
    it('NOT PUT video by correct id, but incorrect data', async() => {
        await req.put(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).send({
            ...newVideo,
            minAgeRestriction: 0,
            author: 33
        }).expect(HARDCODE.HTTP_STATUSES.BadRequest_400, {
            errorsMessages: [{
                field: 'minAgeRestriction',
                message: 'error!!!'
            }, {
                field: 'author',
                message: 'error!!!'
            }]
        } as OutputErrorsType);

        await req.get(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(newVideo!);
    });
    it('PUT video by correct id, with correct data', async() => {
        const reqBodyVideo = {
            title: 'video22',
            author: 'Alex',
            availableResolutions: ["P480", "P720"],
            canBeDownloaded: true
        };

        await req.put(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).send({
            ...newVideo,
            ...reqBodyVideo
        }).expect(HARDCODE.HTTP_STATUSES.NoContent_204);

        await req.get(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect({...newVideo, ...reqBodyVideo});
    });

    it('DELETE video by id', async () => {
        await req.delete(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(HARDCODE.HTTP_STATUSES.NoContent_204);
        await req.delete(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(HARDCODE.HTTP_STATUSES.NotFound_404);
    })
    it('NOT DELETE video by incorrect id', async () => {
        await req.delete(`${HARDCODE.PATH.VIDEOS}/${newVideo!.id}`).expect(HARDCODE.HTTP_STATUSES.NotFound_404);
    })
})