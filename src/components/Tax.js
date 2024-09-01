import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const IncomeTaxCalculator = ({ onTaxChange }) => {
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');
  const [tax, setTax] = useState(0);

  const handleCalculate = () => {
    const brackets = {
      single: [
        { limit: 11000, rate: 0.10 },
        { limit: 44725, rate: 0.12 },
        { limit: 95375, rate: 0.22 },
        { limit: 182100, rate: 0.24 },
        { limit: 231250, rate: 0.32 },
        { limit: 578125, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
      ],
      married: [
        { limit: 22000, rate: 0.10 },
        { limit: 89450, rate: 0.12 },
        { limit: 190750, rate: 0.22 },
        { limit: 364200, rate: 0.24 },
        { limit: 462500, rate: 0.32 },
        { limit: 693750, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
      ],
    };

    const selectedBrackets = filingStatus === 'single' ? brackets.single : brackets.married;
    let taxOwed = 0;
    let previousBracketLimit = 0;

    for (const bracket of selectedBrackets) {
      if (income > bracket.limit) {
        taxOwed += (bracket.limit - previousBracketLimit) * bracket.rate;
        previousBracketLimit = bracket.limit;
      } else {
        taxOwed += (income - previousBracketLimit) * bracket.rate;
        break;
      }
    }

    setTax(taxOwed);
    onTaxChange(taxOwed);
  };

  const handleReset = () => {
    setIncome('');
    setFilingStatus('single');
    setTax(0);
    onTaxChange(0);
  };

  return (
    <Card className="tax-card">
      <Card.Body>
        <Card.Title>Income Tax Calculator</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Income</Form.Label>
            <Form.Control
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your income"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Filing Status</Form.Label>
            <Form.Control
              as="select"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handleCalculate}>Calculate</Button>
          <Button variant="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
        </Form>
        <div className="mt-3">
          <h4>Estimated Tax: ${tax.toFixed(2)}</h4>
        </div>
      </Card.Body>
    </Card>
  );
};

const InvestmentTaxCalculator = ({ onTaxChange }) => {
  const [shortTermGains, setShortTermGains] = useState('');
  const [longTermGains, setLongTermGains] = useState('');
  const [totalTax, setTotalTax] = useState(0);

  const handleCalculate = () => {
    const shortTermBrackets = [
      { limit: 11000, rate: 0.10 },
      { limit: 44725, rate: 0.12 },
      { limit: 95375, rate: 0.22 },
      { limit: 182100, rate: 0.24 },
      { limit: 231250, rate: 0.32 },
      { limit: 578125, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    const longTermBrackets = [
      { limit: 47025, rate: 0.00 },
      { limit: 518900, rate: 0.15 },
      { limit: Infinity, rate: 0.20 },
    ];

    let shortTermTax = 0;
    let previousBracketLimit = 0;
    for (const bracket of shortTermBrackets) {
      if (shortTermGains > bracket.limit) {
        shortTermTax += (bracket.limit - previousBracketLimit) * bracket.rate;
        previousBracketLimit = bracket.limit;
      } else {
        shortTermTax += (shortTermGains - previousBracketLimit) * bracket.rate;
        break;
      }
    }

    let longTermTax = 0;
    let longpreviousBracketLimit = 0;
    for (const bracket of longTermBrackets) {
      if (longTermGains > bracket.limit) {
        longTermTax += (bracket.limit - longpreviousBracketLimit) * bracket.rate;
        longpreviousBracketLimit = bracket.limit;
      } else {
        longTermTax += (longTermGains - longpreviousBracketLimit) * bracket.rate;
        break;
      }
    }

    const totalInvestmentTax = shortTermTax + longTermTax;
    setTotalTax(totalInvestmentTax);
    onTaxChange(totalInvestmentTax);
  };

  const handleReset = () => {
    setShortTermGains('');
    setLongTermGains('');
    setTotalTax(0);
    onTaxChange(0);
  };

  return (
    <Card className="tax-card">
      <Card.Body>
        <Card.Title>Investment Tax Calculator</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Short-Term Capital Gains</Form.Label>
            <Form.Control
              type="number"
              value={shortTermGains}
              onChange={(e) => setShortTermGains(e.target.value)}
              placeholder="Enter short-term gains"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Long-Term Capital Gains</Form.Label>
            <Form.Control
              type="number"
              value={longTermGains}
              onChange={(e) => setLongTermGains(e.target.value)}
              placeholder="Enter long-term gains"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCalculate}>Calculate</Button>
          <Button variant="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
        </Form>
        <div className="mt-3">
          <h4>Estimated Tax: ${totalTax.toFixed(2)}</h4>
        </div>
      </Card.Body>
    </Card>
  );
};

const PropertyTaxCalculator = ({ onTaxChange }) => {
  const [houseValue, setHouseValue] = useState('');
  const [state, setState] = useState('');
  const [propertyTax, setPropertyTax] = useState(0);

  const handleCalculate = () => {
    const stateTaxRates = {
      'AL': 0.0040,
      'AK': 0.0117,
      'AZ': 0.0054,
      'AR': 0.0052,
      'CA': 0.0074,
      'CO': 0.0060,
      'CT': 0.0163,
      'DE': 0.0043,
      'FL': 0.0097,
      'GA': 0.0083,
      'HI': 0.0026,
      'ID': 0.0069,
      'IL': 0.0173,
      'IN': 0.0085,
      'IA': 0.0129,
      'KS': 0.0129,
      'KY': 0.0072,
      'LA': 0.0018,
      'ME': 0.0109,
      'MD': 0.0087,
      'MA': 0.0104,
      'MI': 0.0162,
      'MN': 0.0105,
      'MS': 0.0052,
      'MO': 0.0091,
      'MT': 0.0083,
      'NE': 0.0176,
      'NV': 0.0084,
      'NH': 0.0186,
      'NJ': 0.0189,
      'NM': 0.0055,
      'NY': 0.0123,
      'NC': 0.0078,
      'ND': 0.0142,
      'OH': 0.0136,
      'OK': 0.0074,
      'OR': 0.0087,
      'PA': 0.0135,
      'RI': 0.0135,
      'SC': 0.0050,
      'SD': 0.0128,
      'TN': 0.0068,
      'TX': 0.0181,
      'UT': 0.0060,
      'VT': 0.0159,
      'VA': 0.0074,
      'WA': 0.0092,
      'WV': 0.0049,
      'WI': 0.0176,
      'WY': 0.0058,
    };

    const rate = stateTaxRates[state] || 0.005;
    const taxOwed = houseValue * rate;

    setPropertyTax(taxOwed);
    onTaxChange(taxOwed);
  };

  const handleReset = () => {
    setHouseValue('');
    setState('');
    setPropertyTax(0);
    onTaxChange(0);
  };

  return (
    <Card className="tax-card">
      <Card.Body>
        <Card.Title>Property Tax Calculator</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>House Value</Form.Label>
            <Form.Control
              type="number"
              value={houseValue}
              onChange={(e) => setHouseValue(e.target.value)}
              placeholder="Enter house value"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handleCalculate}>Calculate</Button>
          <Button variant="secondary" className="ms-2" onClick={handleReset}>Reset</Button>
        </Form>
        <div className="mt-3">
          <h4>Estimated Tax: ${propertyTax.toFixed(2)}</h4>
        </div>
      </Card.Body>
    </Card>
  );
};

const Tax = () => {
  const [incomeTax, setIncomeTax] = useState(0);
  const [investmentTax, setInvestmentTax] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);

  const totalTax = incomeTax + investmentTax + propertyTax;

  return (
    <Container className="tax-container">
      <h1>Tax Calculators</h1>
      <div className="tax-calculators">
        <IncomeTaxCalculator onTaxChange={setIncomeTax} />
        <InvestmentTaxCalculator onTaxChange={setInvestmentTax} />
        <PropertyTaxCalculator onTaxChange={setPropertyTax} />
      </div>
      <div className="mt-4">
        <h2>Total Tax: ${totalTax.toFixed(2)}</h2>
      </div>
    </Container>
  );
};

export default Tax;
