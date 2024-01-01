import React, { useEffect, useState } from 'react';
import "../../../Styles/StoreSetting.css"
import "../../../Styles/Settings/SystemAccess.css"
import Switch from '@mui/material/Switch';
import { fetchsystemAccessListData } from "../../../Redux/features/SystemAccess/systemAccessSlice";
import { useSelector, useDispatch } from 'react-redux';




const SystemAccessData = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const [systemAccess, setallSystemAccess] = useState([])
    const AllInSystemAccessState = useSelector((state) => state.systemAccessList)
    const dispatch = useDispatch();
    useEffect(() => {
    let data = {
        merchant_id: "MAL0100CA"
    };
    if (data) {
        dispatch(fetchsystemAccessListData(data));
    }
}, []);

    useEffect(() => {
        if (!AllInSystemAccessState.loading && AllInSystemAccessState.systemAccessData) {
            setallSystemAccess(AllInSystemAccessState.systemAccessData)
        }
    }, [AllInSystemAccessState, AllInSystemAccessState.loading, AllInSystemAccessState.systemAccessData])


    useEffect(() => {
        console.log('Sytem Access Data',systemAccess)
    }, [systemAccess])


    return (
        <>
            <div className="box_shadow_div">
                <div className="qvrow">
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>Default Cash Drawer Start</label>
                            <input
                                type="text"
                                placeholder="%0.00"
                                maxlength="8"
                                name="default_cash_drawer"
                                id="cash_drawer"
                                value=""
                            />
                        </div>
                        <div className="qv_checkbox">
                            <label className="qv_checkbox_add_checkmark_label">Clock In/Out Receipt
                                <input type="checkbox" id="delivery103890" name="clock_in" value="1"
                                // checked={systemList.clock_in}
                                />
                                <span className="qv_add_checkmark"></span>
                            </label>
                        </div>
                        <div className="qv_checkbox">
                            <label className="qv_checkbox_add_checkmark_label">Hide Inactive Employees
                                <input type="checkbox"
                                    id="delivery103890"
                                    name="hide_inactive"
                                    value="1"
                                //   <?php if($system_list['hide_inactive']==1) echo 'checked'?>
                                />
                                <span className="qv_add_checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box_shadow_div">
                <div className="qvrow">
                    <h5 className="box_shadow_heading">Time Clock</h5>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>End of Day Allowance</label>
                            <select>
                                <option value="1">Deny if staff clocked in</option>
                                <option value="2">Mass clock out staff clocked in</option>
                                <option value="3" selected="">Ignore Time Clock</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>Shift Assignment</label>
                            <select>
                                <option value="1" selected="">Don’t Track Shifts</option>
                                <option value="2">Track Shifts by Cashier</option>
                                <option value="3">Track Shifts by Station</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>


            <div className="box_shadow_div">
                <div className="qvrow">
                    <h5 className="box_shadow_heading">Default Reporting Start & End Date/Time</h5>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>Start Day</label>
                            <select>
                                <option value="1">Yesterday</option>
                                <option value="2">Today</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>End Day</label>
                            <select>
                                <option value="1" selected="">Today</option>
                                <option value="2">Tomorrow</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="qvrow">
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>Start Time</label>
                            <input
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>End Time</label>
                            <input
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className="box_shadow_div">
                <div className="qvrow">
                    <h5 className="box_shadow_heading">Viewable Sales Report History
                        <div className="fr">
                            <Switch {...label} />
                        </div>
                    </h5>
                    <div className="col-qv-6">
                        <div className="input_area">
                            <label>Restricted by Employee permission (Number of Days)</label>
                            <input
                                type="text"
                                placeholder="%0.00"
                            />
                        </div>
                    </div>
                </div>
                <div className="qvrow">
                    <div className="col-md-6">
                        <button class="save_btn">Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SystemAccessData;

