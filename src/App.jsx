import { useEffect, useState } from 'react'
import './App.css'
import { tenureData } from './utils/constants';
import { numberWithCommas } from './utils/config';
import TextInput from './components/TextInput';
function App() {
  const [cost, setCost] = useState(1000);
  const [interest, setInterest] = useState( 9);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);


 
  const calculateEMI = (downPayment) => {
    // emiAmount= [cost*interest*(1-interest)]

    if (!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = (interest / 100);
    const numOfYears = tenure / 12;

    const EMI = (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) / ((1 + rateOfInterest) ** numOfYears - 1)

    return Number(EMI / 12).toFixed(0);

  }

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);
    setEmi(emi)

  }

  const updateDownPayment = () => {
    if (!cost) return;

    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0));

    //Calculate DP and Update it

    const dp = calculateDP(emi)
    setDownPayment(dp)
  }

  const calculateDP = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateDP(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0)
  }


  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi)

  }, [tenure, cost, fee])

  useEffect(() => {
    if(interest>=100){
      alert("Rate of Interest cannot be greater than 100");
      setInterest(0)
    }
    if(fee>=100){
      alert("Processing fee cannot be greater than 100")
    }
    setFee(1)
  }, [interest,fee]);

  return (
    <div className='App'>
      <span className='title' style={{ fontSize: 30, marginTop: 10 }}>EMI Calculator</span>

      <TextInput
      title={"Total Cost of Assets"}
      state={cost}
      setState={setCost}
      />


       <TextInput
      title={"Interest Rate (in %)"}
      state={interest }
      setState={setInterest}
      />

      <TextInput
      title={"Processing Fee (in %))"}
      state={fee}
      setState={setFee}
      />




      <span className='title'>Down Payment</span>


      <span className='title' style={{ textDecoration: "underline" }}>{" "}
        Total down Payment -{numberWithCommas((Number(downPayment) + (cost - downPayment) * (fee / 100).toFixed(0)))}
      </span>


      <div>
        <input type="range"
          value={downPayment}
          min={0}
          max={cost}
          className='slider'
          onChange={updateEMI}
        
        />

        <div className="lables">
          <lable>0%</lable>
          <b>{numberWithCommas(downPayment)}</b>
          <lable>100%</lable>
        </div>
      </div>


      <span className='title'>Tenure</span>
      <div className="tenureContainer">

        {tenureData.map((months) => <button className={`tenure ${months === tenure ? "selected" : ""}`} onClick={() => setTenure(months)}>{months}</button>)}
      </div>


      <span className='title'>Loan Per Month</span>

      {cost && (<span className='title' style={{ textDecoration: "underline", backgroundColor:"green", width:"25vw", height:'6vh', textAlign:"center", paddingTop:"10px" }}>{" "}
        Total Loan Amount -{numberWithCommas((Number(emi*tenure)).toFixed(0))}
      </span>)}

      <div>
        <input type="range"
          value={emi}
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className='slider'
          onChange={updateDownPayment}
        
        />
        <div className="lables">
          <lable >{numberWithCommas(calculateEMI(cost))}</lable>
          <b>{numberWithCommas(emi)}</b>
          <lable >{numberWithCommas(calculateEMI(0))}</lable>
        </div>
      </div>



            <div className="footer">
              <p>Made with ❤️ by Surya Prakash</p>
                <p>Email- spsurya392@gmail.com</p>
                <p>Contact- +917003740773</p>
              
            </div>
    </div>
  )
}

export default App
