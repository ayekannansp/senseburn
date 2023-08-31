import Link from 'next/link'
import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

function HomeSection() {
  return (
    <section className='banner bg-white'>
      <Container>
        <Row className='align-items-center mb-5'>
          <Col md='5'>
            <h1 className='mb-3'>Start a scan</h1>
            <p>Let's get started</p>
            <div className='cards mt-5'>
              <Link href='/new-patient' className='sense-card'>
                <div className='d-flex align-items-center gap-4'><div className="pulse"><Image src='/img/right.png' alt='arrow' /></div>Click here to add a new patient</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 81 20" className="right-arrow"><g fill="none" fill-rule="evenodd"><g stroke="#000" strokeWidth="3"><g><g><g><path className="arrow-head" d="M16.899 2.899L16.898 16.898 2.899 16.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1) translate(57.203) rotate(-45 9.9 9.9)"></path></g><path className="arrow-line" d="M76.163 9.899L0 9.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1)"></path></g></g></g></g></svg>
              </Link>
              <Link href='/patients' className='sense-card'>
                <div className='d-flex align-items-center gap-4'><div className="pulse"><Image src='/img/right.png' alt='arrow' /></div>Click here to view patient list</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 81 20" className="right-arrow"><g fill="none" fill-rule="evenodd"><g stroke="#000" strokeWidth="3"><g><g><g><path className="arrow-head" d="M16.899 2.899L16.898 16.898 2.899 16.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1) translate(57.203) rotate(-45 9.9 9.9)"></path></g><path className="arrow-line" d="M76.163 9.899L0 9.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1)"></path></g></g></g></g></svg>
              </Link>
              {/* <Link href='' className='sense-card'>
                <div className='d-flex align-items-center gap-4'><div className="pulse"><Image src='/img/right.png' alt='arrow' /></div>New</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 81 20" className="right-arrow"><g fill="none" fill-rule="evenodd"><g stroke="#000" strokeWidth="3"><g><g><g><path className="arrow-head" d="M16.899 2.899L16.898 16.898 2.899 16.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1) translate(57.203) rotate(-45 9.9 9.9)"></path></g><path className="arrow-line" d="M76.163 9.899L0 9.899" transform="translate(-767 -827) translate(736 642) translate(31.88 185.1)"></path></g></g></g></g></svg>
              </Link> */}
            </div>
          </Col>
          <Col md='7'>
            <div className='home-img'> <Image src='/img/body-bg.png' alt='body' className='img-bg' /></div>
          </Col>
        </Row>
      </Container>
    </section>
  ) 
}

export default HomeSection