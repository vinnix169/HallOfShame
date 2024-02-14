function makeTag(length, existingUsers) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters
            .charAt(Math.floor(Math.random() * charactersLength))
            .toUpperCase();
        counter += 1;
    }

    for (let i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].userTag === result) {
            // If a match is found, recursively call makeTag
            return makeTag(length, existingUsers);
        }
    }
    return result;
}

module.exports = { makeTag };
