import FetchMovieDetails from '@/queries/FetchMovieDetails';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  const Param = useParams()
  const {isLoading,data,error,refetch} = FetchMovieDetails(Number(Param.id))
  console.log(data, "param");
  return <div>MovieDetails</div>;
}
