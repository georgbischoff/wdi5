async function clientSide_executeObjectMethod(uuid, methodName, args) {
    return await browser.executeAsync(
        (uuid, methodName, args, done) => {
            window.wdi5.waitForUI5(
                window.wdi5.waitForUI5Options,
                () => {
                    // DOM to UI5
                    const oObject = window.wdi5.objectMap[uuid]

                    // execute the function
                    debugger
                    let result = oObject[methodName].apply(oObject, args)
                    const metadata = oObject.getMetadata()

                    // result mus be a primitive
                    if (window.wdi5.isPrimitive(result)) {
                        // getter
                        done({ status: 0, result: result, returnType: "result" })
                    } else {
                        // create new object
                        const uuid = window.wdi5.saveObject(result)
                        done({ status: 0, result: uuid, returnType: "object" })
                    }
                },
                window.wdi5.errorHandling.bind(this, done)
            )
        },
        uuid,
        methodName,
        args
    )
}

module.exports = {
    clientSide_executeObjectMethod
}
