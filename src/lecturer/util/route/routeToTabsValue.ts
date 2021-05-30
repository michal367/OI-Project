const routeValueRecord : Record<string,number|undefined> = {
    "/lecturer":0,
    "/lecturer/session":0,
    "/lecturer/quiz":1,
    "/lecturer/quizzes":1,
    "/lecturer/question":2,
    "/lecturer/questions":2,
    "/lecturer/timestamp":3,
    "/lecturer/stats":4,
};
export default function routeToTabsValue(route:string){
    return routeValueRecord[route];
}