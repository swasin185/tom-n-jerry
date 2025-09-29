export default eventHandler(async () => {
    // const redis = await getRedis()
    const redis = useStorage(process.env.REDIS_HOST ? "redis" : "data")
    // const counter : number = await redis.incr('appCounter')
    const counter: number = ((await redis.getItem("appCounter")) as number) + 1
    redis.set("appCounter", counter) // don't await this operation
    return counter
})
