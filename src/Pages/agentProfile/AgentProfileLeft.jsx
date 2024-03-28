import React from 'react'


const AgentProfileLeft = ({ pathName, toggle, tab, leftPath, data, menu }) => {

    const handleClick = (e) => {
        toggle(e);
    };
    // console.log(data)
    return (
        <div className='agentProfileContentContainer'>
            <div className='agentProfileContentLeft'>

                {leftPath.map((item, index) => (
                    <div  key={index}>
                    <div>{
                        (item.name === "home" || data?.agentInviteData) &&

                        <div onClick={() => handleClick(item?.name)} className={`agentProfileContentLeftItem ${tab === item.name && "activeAgentProfile"}`}
                       >
                            <div className='agentProfileContentLeftItemIcon' >

                                {item.icon}
                            </div>
                            
                            
                                <div className={`agentProfileContentLeftItemText ${!menu && "MenueFalse"}`}>

                                    {menu ?item.name:""}
                                </div>
                            
                        </div>
                    }
                    </div>
                    </div>
                ))}
              
            </div>
            <div>

            </div>

        </div>
    )
}

export default AgentProfileLeft
