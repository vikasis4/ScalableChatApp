const validRoomRequest = (data: any, email: string): boolean => {

    var result = false;
    for (let index = 0; index < data.length; index++) {
        data[index].users.forEach((data: any) => {
            if (data.email === email) {
                result = true;
            }
        })
    }

    return result

}

export default validRoomRequest