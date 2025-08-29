// src/pages/api/licenses/request-fingerprint.ts
import type { APIRoute } from "astro";
import machineId from "node-machine-id";
import crypto from 'crypto';

export const GET: APIRoute = async () => {
  const machineUid = await machineId.machineId();
  // Se hashea el ID para crear una huella digital segura y única.
  const machineFingerprint = crypto.createHash('sha256').update(machineUid + 'mi-app-secreta').digest('hex');
  return new Response(JSON.stringify({ fingerprint: machineFingerprint }), {
    headers: { 'Content-Type': 'application/json' },
  });
};