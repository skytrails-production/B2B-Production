import React from 'react'
import { IoMdHome } from "react-icons/io";


const AgentProfileLeft = ({pathName}) => {
    return (
        <div className='agentProfileContentContainer'>
            <div className='agentProfileContentLeft'>
                
                <div className={`agentProfileContentLeftItem ${pathName==="/agentProfile/dashboard" && "activeAgentProfile"}` }
                >
                    <div className='agentProfileContentLeftItemIcon' >

                        <IoMdHome size={20} />
                    </div>
                    <div className='agentProfileContentLeftItemText'>

                        Home
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default AgentProfileLeft
