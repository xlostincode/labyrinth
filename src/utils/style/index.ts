export function classNames(...classes: unknown[]) {
    const classListArray = []

    for (let index = 0; index < classes.length; index++) {
        const classString = classes[index]

        if (Boolean(classString)) {
            classListArray.push(classString)
        }
    }

    return classListArray.join(" ")
}
