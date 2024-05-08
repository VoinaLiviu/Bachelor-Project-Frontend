import React from 'react'

function genereateStars(number) {
    let stars = ""
    for (let sec = 0; sec < number; sec++) {
        stars += "⭐"
    }
    return (stars)
}

export default function Rating({ security, popularity }) {
    return (
        <div class="ratingContainer">
            <div class="ratingContainerSpecific">
                <p class="text securityText">Security:</p>
                <div>{genereateStars(security)}</div>
            </div>
            <div class="ratingContainerSpecific">
                <p class="text securityText">Popularity:</p>
                <div>{genereateStars(popularity)}</div>
            </div>
        </div>

    )
}
