import { useState } from "react"
import moment from "moment/moment";
import { v4 as uuid } from 'uuid';

function App() {

  const [personList, setPersonList] = useState([])
  const [person, setPerson] = useState({
    id: 0,
    name: '',
    dateOfBirth: '',
    image: ''
  }); // cada card representa una persona

  // const [name, setName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [image, setImage] = useState('');

  const onChangeHanlder = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value,  id: personList.length + 1 })
  }

  const addPersonHandler = (ev) => {
    ev.preventDefault()
    if (person.name !== '' && person.dateOfBirth !== '' && person.imagen !== '') {
      setPersonList([...personList, person])
    }
  }

  const diffYears = ( dateA )=>{
    const a = moment();
    const b = moment(dateA);
    const days = moment.duration( a.diff(b) );
    return days.get('year')
  }

  const daysToBirthday = ( dateA )=>{
    const fechaNacimiento = moment(dateA, 'YYYY-MM-DD');
    const fechaActual = moment()
    const proxCumple = moment(fechaActual).set({
      'year' : fechaActual.year(),
      'month': fechaNacimiento.month(),
      'date' : fechaNacimiento.date()
    })
    if( fechaActual.isAfter( proxCumple )){
      proxCumple.add(1, 'years')
    }
    const diasFaltantes = proxCumple.diff(fechaActual, 'days');
    return diasFaltantes;
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6">
          <form className="p-3 bg-dark text-white m-3 rounded" >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={onChangeHanlder} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Fecha de Naciemiento</label>
              <input type="date" className="form-control" id="exampleInputPassword1" name='dateOfBirth' onChange={onChangeHanlder} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Imagen</label>
              <input type="text" className="form-control" id="exampleInputPassword1" name='image' onChange={onChangeHanlder} />
            </div>
            <button onClick={addPersonHandler} type="submit" className="btn btn-primary">save</button>
          </form>
        </div>
        <div className="col-12 col-md-6">
          {
            personList.map(( person )=>{
              return <div key={uuid()} className="card mb-3 m-3" style={{ maxWidth: '540px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={person.image} className="img-fluid rounded-start h-100" alt="imagen de saiyaman" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Name: {person.name}</h5>
                    <p className="card-text">Edad: <b>{diffYears(person.dateOfBirth )} años</b></p>
                    <p className="card-text">Dias para cumpleaños: <b>{daysToBirthday(person.dateOfBirth)}</b></p>
                  </div>
                </div>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
