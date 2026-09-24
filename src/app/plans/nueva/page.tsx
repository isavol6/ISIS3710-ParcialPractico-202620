//PUNTO2

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";
import { createPlan } from "@/services/plans";

export default function NewPlanPage() {
  const router = useRouter();

  // estados para el formulario
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [recomendations, setRecomendations] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const errores: { [key: string]: string } = {};


    // Validar nombre 2-50 caracteres
    if (name.length < 2 || name.length > 50) {
        errores.name = "Nombre no válido";
    }
    //validar correo, debe ser obligatorio 
    if (address == "" || address.trim() == "") {
        errores.address = "Dirección obligatoria";
    }
    // Validar precio estimado, debe ser un número positivo
    const priceNumber = Number(estimatedPrice);
    if (estimatedPrice == "" || isNaN(priceNumber) || priceNumber <= 0) {
        errores.estimatedPrice = "Precio no válido";
    }
    // Validar duración estimada, debe ser un número entero positivo
    const timeNumber = Number(estimatedTime);
    if (estimatedTime == "" || isNaN(timeNumber) || !Number.isInteger(timeNumber)) {
        errores.estimatedTime = "Duración no válida";
    }
    // Validar descripción, obligatoria y no mas de 600 caracteres
    if (description == "" || description.trim() == "") {
        errores.description = "Descripción  obligatoria";
    } else if (description.length >= 600) {
        errores.description = "Descripción demasiado larga";
    }

    return errores;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const errores = validate();
    setErrors(errores);
    //si hay errores no puedo continuar
    if (Object.keys(errores).length > 0) return;

    // Verificar si el usuario está logueado y obtener su id 
    const session = getSession();
    if (!session.id) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    try { 
    // Mandar al back la información del plan para crear uno nuevo
      await createPlan({
        name: name,
        description: description,
        estimatedPrice: Number(estimatedPrice),
        estimatedTime: Number(estimatedTime),
        recomendations: recomendations,
        address: address,
        image: image,
        userId: session.id,
      });
      // Si todo sale bien, redirigir a la página de planes
      router.push("/plans");
    } catch (err) {
      setServerError("No se pudo crear el plan/");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-5xl font-bold text-slate-900 mt-6">Crear un nuevo plan</h1>
        <p className="text-lg text-slate-600 mt-2">
          Crea tu propio plan.
        </p>

        <form onSubmit={handleSubmit} >
          <label htmlFor="image">
            Foto de portada del plan
          </label>
          <p className="text-lg text-slate-600 mt-2">Copia el enlace de una imagen</p>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />

          <label htmlFor="name" className="block text-sm font-bold mt-4">
            Nombre del plan *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Tarde de paddle surf y atardecer"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}

          <label htmlFor="address" className="block text-sm font-bold mt-4">
            Dirección *
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ej. Muelle Norte"
          />
          {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <label htmlFor="estimatedPrice" className="block text-sm font-bold">
                Precio estimado *
              </label>
              <input
                id="estimatedPrice"
                type="number"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                placeholder="Ej. 25000"
              />
              {errors.estimatedPrice && <p className="text-sm text-red-600 mt-1">{errors.estimatedPrice}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="estimatedTime" className="block text-sm font-bold">
                Duración (minutos) *
              </label>
              <input
                id="estimatedTime"
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="Ej. 120"
              />
              {errors.estimatedTime && <p className="text-sm text-red-600 mt-1">{errors.estimatedTime}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <label htmlFor="description" className="block text-sm font-bold">
              Descripción del plan *
            </label>
            <span>{description.length} / 600</span>
          </div>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}

          <label htmlFor="recomendations" className="block text-sm font-bold mt-4">
            Recomendaciones para los asistentes
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Agrega tips clave como vestimenta recomendada
          </p>
          <input
            id="recomendations"
            type="text"
            value={recomendations}
            onChange={(e) => setRecomendations(e.target.value)}
            placeholder="Ej. Llevar protector solar, toalla y agua"
          />

          {serverError && <p className="text-sm text-red-600 mt-4">{serverError}</p>}

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <button type="button" onClick={() => router.push("/plans")} className="bg-gray-200 text-gray-800 font-bold rounded px-4 py-2">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white font-bold rounded px-4 py-2">
              {loading ? "Publicando..." : "Publicar plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}