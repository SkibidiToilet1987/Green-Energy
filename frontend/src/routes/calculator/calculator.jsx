import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import MainNavigation from '../../components/mainnavigation'
import MainFooter from '../../components/MainFooter'

const Calculator = () => {
    // State for form inputs with empty initial values
    const [transportation, setTransportation] = useState({
        carMiles: '',
        flightHours: ''
    })
    
    const [home, setHome] = useState({
        electricityKwh: '',
        gasTherm: ''
    })
    
    const [results, setResults] = useState({
        transportationEmissions: 0,
        homeEmissions: 0,
        totalEmissions: 0,
        calculated: false
    })
    
    // Handle input changes for transportation
    const handleTransportationChange = (e) => {
        const { name, value } = e.target
        setTransportation({
            ...transportation,
            [name]: value
        })
    }
    
    // Handle input changes for home
    const handleHomeChange = (e) => {
        const { name, value } = e.target
        setHome({
            ...home,
            [name]: value
        })
    }
    
    // Calculate carbon footprint
    const calculateFootprint = () => {
        // Parse values, defaulting to 0 if empty or not a number
        const transportationValues = {
            carMiles: parseFloat(transportation.carMiles) || 0,
            flightHours: parseFloat(transportation.flightHours) || 0
        }
        
        const homeValues = {
            electricityKwh: parseFloat(home.electricityKwh) || 0,
            gasTherm: parseFloat(home.gasTherm) || 0
        }
        
        // Emission factors (kg CO2e)
        const emissionFactors = {
            carPerMile: 0.404, // kg CO2e per mile
            flightPerHour: 90, // kg CO2e per hour
            electricityPerKwh: 0.4, // kg CO2e per kWh
            gasPerTherm: 5.3, // kg CO2e per therm
        }
        
        // Calculate emissions for each category
        const transportationEmissions = 
            transportationValues.carMiles * emissionFactors.carPerMile +
            transportationValues.flightHours * emissionFactors.flightPerHour
            
        const homeEmissions = 
            homeValues.electricityKwh * emissionFactors.electricityPerKwh +
            homeValues.gasTherm * emissionFactors.gasPerTherm
            
        const totalEmissions = transportationEmissions + homeEmissions
        
        // Update results
        setResults({
            transportationEmissions: Math.round(transportationEmissions * 100) / 100,
            homeEmissions: Math.round(homeEmissions * 100) / 100,
            totalEmissions: Math.round(totalEmissions * 100) / 100,
            calculated: true
        })
    }
    
    // Reset form
    const resetForm = () => {
        setTransportation({
            carMiles: '',
            flightHours: ''
        })
        
        setHome({
            electricityKwh: '',
            gasTherm: ''
        })
        
        setResults({
            transportationEmissions: 0,
            homeEmissions: 0,
            totalEmissions: 0,
            calculated: false
        })
    }
    
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MainNavigation />
            <div style={{ flex: 1, paddingTop: '30px', paddingBottom: '30px' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Card className="shadow mb-4">
                                <Card.Body>
                                    <Card.Title className="fs-2 text-center mb-4">
                                        <strong>Carbon Footprint Calculator</strong>
                                    </Card.Title>
                                    <p className="text-center mb-4">
                                        Enter your monthly usage to estimate your carbon footprint
                                    </p>
                                    
                                    {/* Transportation Section */}
                                    <Card className="mb-4">
                                        <Card.Header className="bg-dark text-white">
                                            <h5 className="mb-0">Transportation</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Car miles driven (monthly)</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    name="carMiles"
                                                    value={transportation.carMiles}
                                                    onChange={handleTransportationChange}
                                                    placeholder="e.g., 400"
                                                />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Flight hours (monthly)</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    name="flightHours"
                                                    value={transportation.flightHours}
                                                    onChange={handleTransportationChange}
                                                    placeholder="e.g., 2"
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    
                                    {/* Home Energy Section */}
                                    <Card className="mb-4">
                                        <Card.Header className="bg-dark text-white">
                                            <h5 className="mb-0">Home Energy</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Electricity usage (kWh per month)</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    name="electricityKwh"
                                                    value={home.electricityKwh}
                                                    onChange={handleHomeChange}
                                                    placeholder="e.g., 500"
                                                />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Natural gas usage (therms per month)</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    name="gasTherm"
                                                    value={home.gasTherm}
                                                    onChange={handleHomeChange}
                                                    placeholder="e.g., 50"
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    
                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-center gap-3 mb-4">
                                        <Button 
                                            variant="dark" 
                                            onClick={calculateFootprint}
                                            className="px-4"
                                        >
                                            Calculate
                                        </Button>
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={resetForm}
                                            className="px-4"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                    
                                    {/* Results Section */}
                                    {results.calculated && (
                                        <Card className="bg-light">
                                            <Card.Header className="bg-success text-white">
                                                <h5 className="mb-0">Your Carbon Footprint Results</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <h6>Transportation Emissions:</h6>
                                                            <p className="fs-5">{results.transportationEmissions} kg CO₂e</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <h6>Home Energy Emissions:</h6>
                                                            <p className="fs-5">{results.homeEmissions} kg CO₂e</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="mb-3 text-center">
                                                    <h5>Total Monthly Carbon Footprint:</h5>
                                                    <p className="fs-4 fw-bold">{results.totalEmissions} kg CO₂e</p>
                                                </div>
                                                <div className="mt-3 pt-3 border-top">
                                                    <h6>Carbon Footprint Comparison:</h6>
                                                    <p>
                                                        {results.totalEmissions < 300 ? 
                                                            "Your carbon footprint is lower than average. Great job!" : 
                                                            results.totalEmissions < 600 ? 
                                                                "Your carbon footprint is about average. There are opportunities to reduce it further." :
                                                                "Your carbon footprint is higher than average. Consider ways to reduce your emissions."
                                                        }
                                                    </p>
                                                    <h6 className="mt-3">Reduction Tips:</h6>
                                                    <ul>
                                                        {parseFloat(transportation.carMiles) > 300 && (
                                                            <li>Consider carpooling, using public transportation, or driving less frequently</li>
                                                        )}
                                                        {parseFloat(transportation.flightHours) > 2 && (
                                                            <li>Try to consolidate flights or explore alternatives like trains for shorter trips</li>
                                                        )}
                                                        {parseFloat(home.electricityKwh) > 400 && (
                                                            <li>Reduce electricity usage by using energy-efficient appliances and turning off lights</li>
                                                        )}
                                                        {parseFloat(home.gasTherm) > 40 && (
                                                            <li>Improve home insulation to reduce heating needs</li>
                                                        )}
                                                        <li>Consider offsetting your carbon footprint by planting trees or supporting renewable energy projects</li>
                                                    </ul>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <MainFooter />
        </div>
    )
}

export default Calculator