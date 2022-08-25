import React from 'react'

function RenderLeader(props) {

    return (
        <div className="row mt-4">
            <div className="col-2">
                <img src={props.leader.image} alt="leaderImg" />
            </div>
            <div className="col-10">
                <h2>{props.leader.name}</h2>
                <p>{props.leader.designation}</p>
                <p>{props.leader.description}</p>
            </div>
        </div>
    )
}

export default RenderLeader