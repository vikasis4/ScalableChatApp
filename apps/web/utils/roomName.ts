const roomName = (data: any, id: string) => {

    var data_: { name: string, email: string } = { name: '', email: '' }
    data?.forEach((_data: any) => {
        if (_data.id != id) {
            data_ = {
                name: _data.username,
                email: _data.email
            }
        }
    });
    
    return data_

}

export default roomName