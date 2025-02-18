import React from 'react'
import { numberWithCommas } from '../utils/config'

const SliderInput = ({title, state, min, max, onChange, labelMin, LabelMax, underlineTitle}) => {
  return (
    <>
     <span className='title'>{title}</span>
      {state && (<span className='title' style={{ textDecoration: "underline" }}>{" "}
              {/* Total down Payment -{numberWithCommas((Number(downPayment) + (cost - downPayment) * (fee / 100).toFixed(0)))} */}

              {underlineTitle}
            </span>)}

            <div>
                    <input type="range"
                      value={state}
                      min={min}
                      max={max}
                      className='slider'
                      onChange={onChange}
                    
                    />
            
                    <div className="lables">
                      <lable>{labelMin ?? numberWithCommas(min)}</lable>
                      <b>{numberWithCommas(state)}</b>
                      <lable>{LabelMax ?? numberWithCommas(max)}</lable>
                    </div>
                  </div>
    </>
  )
}

export default SliderInput
