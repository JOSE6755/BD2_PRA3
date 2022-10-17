const express=require('express');
const app=express()
const port=3000
const cassandra=require('cassandra-driver')

const client=new cassandra.Client({
    contactPoints:['127.0.0.1'],
    localDataCenter:'datacenter1',
    keyspace:'Practica3'
})
client.connect()
const locales='SELECT * FROM locales where temporada=? and equipo1=? order by jornada'
const visitantes='select * from visitantes where temporada=? and equipo2=? order by jornada'
const marcadores='select goles1,goles2 from marcadores where temporada=? and equipo1=? and equipo2=?'
const rivales='select equipo2 from "Practica3".rival where equipo1=? and jornada=? and temporada=?'
const goles1='select goles1,goles2 from resultados where equipo1=? and temporada=?'
const goles2='select goles1,goles2 from resultados where equipo2=? and temporada=?'
app.get('/locales/:data',(req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    console.log(datos)
    client.execute(locales,datos).then(result=>res.send(result.rows))
})
app.get('/visitantes/:data',(req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    console.log(datos)
    client.execute(visitantes,datos).then(result=>res.send(result.rows))
})
app.get('/marcadores/:data',(req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    console.log(datos)
    client.execute(marcadores,datos).then(result=>res.send(result.rows))
})
app.get('/rivales/:data',(req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    console.log(datos)
    client.execute(rivales,datos).then(result=>res.send(result.rows))
})
app.get('/goles/:data',async (req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    const resultado=[]
    console.log(datos)
    await client.execute(goles1,datos).then(result=>resultado.push(result.rows))
    await client.execute(goles1,datos).then(result=>resultado.push(result.rows))
    
    res.send("Noches, espero puedan dormir, feliz inicio de semana :)")
})
app.get('/goles2/:data',(req,res)=>{
    console.log(req.params.data)
    const datos=req.params.data.split(',')
    console.log(datos)
    client.execute(goles,datos).then(result=>res.send(result.rows))
})
app.listen(port,()=>{
    console.log("Aplicacion funcionando")
})