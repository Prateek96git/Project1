import React, { useState } from 'react';
function Search(props) {
    const [name, setName] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('name =', name);
        props.search(name)
    }

    const clearHandler = (e) => {
        e.preventDefault();
        setName("")
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler} >
                            <div className="form-group">
                                <label htmlFor="name">Artist Name</label>
                                <div className="input-group">
                                    <input type="search" name="name" id="name" value={name} onChange={(e) => setName(e.
                                        target.value)} className="form-control" required />
                                    <input type="submit" value="Search" className="btn btn-success" />
                                    <input type="reset" value="Clear" className="btn btn-warning" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Search