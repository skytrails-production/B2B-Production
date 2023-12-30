import React from 'react';
import { Button, Box } from '@mui/material';
import color from "../../../color/color"
const TransferForm = () => {
  return (
    <div className='container'>
            
            <div className='row'>
            <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Destination</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Delhi</option>
                            <option mx={5}>Delhi</option>
                            <option mx={5}>Delhi</option>
                            <option mx={5}>Delhi</option>
                            <option mx={5}>Delhi</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Pick Up</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Select</option>
                            <option mx={5}>Indian</option>
                            <option mx={5}>Indian</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">DEPARTURE</label>
                        <input
                            type="date"
                            name="departure"
                            id="departure"
                            className="deaprture_input"
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Drop Off</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Select</option>
                            <option mx={5}>Indian</option>
                            <option mx={5}>Indian</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Pick Up Time</label>
                        <input
                            type="time"
                            name="mane_a_keyword"
                            className="deaprture_input"
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Nationality</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Indian</option>
                            <option mx={5}>Indian</option>
                            <option mx={5}>Indian</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Language</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Select</option>
                            <option mx={5}>English</option>
                            <option mx={5}>Hindi</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-2">
                    <div className="form_input">
                        <label className="form_lable">Passengers</label>
                        <select name="" id="" className="form_input_select">
                            <option mx={5}>Select</option>
                            <option mx={5}>1</option>
                            <option mx={5}>2</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='row' >
                <div className="col-xs-12">
                    <form action="/TransferResult">
                        <Box display='flex' >
                            <Button
                                variant='contained'
                                my={4}
                                colorScheme="teal"
                                type="submit"
                                m
                                sx={{ backgroundColor:color.bluedark, borderRadius: '20px' }}
                            >
                                Search
                            </Button>
                        </Box>
                    </form>
                </div>

            </div>
        </div>
  )
}

export default TransferForm
