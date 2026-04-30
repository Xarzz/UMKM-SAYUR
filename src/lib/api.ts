// Helper untuk bypass supabase-js dan langsung pakai REST API

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return {
    url,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }
  };
};

export async function sbGet(table: string, query: string = "") {
  const { url, headers } = getSupabaseConfig();
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${table} failed: ${res.statusText}`);
  return res.json();
}

export async function sbInsert(table: string, data: any) {
  const { url, headers } = getSupabaseConfig();
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`INSERT ${table} failed: ${res.statusText}`);
  return res.json();
}

export async function sbUpdate(table: string, id: number, data: any) {
  const { url, headers } = getSupabaseConfig();
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`UPDATE ${table} failed: ${res.statusText}`);
  return res.json();
}

export async function sbDelete(table: string, id: number) {
  const { url, headers } = getSupabaseConfig();
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error(`DELETE ${table} failed: ${res.statusText}`);
}

// Upload file to Supabase Storage
export async function sbUploadImage(file: File, bucket: string = "products"): Promise<string> {
  const { url, headers } = getSupabaseConfig();
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const res = await fetch(`${url}/storage/v1/object/${bucket}/${fileName}`, {
    method: "POST",
    headers: {
      apikey: headers.apikey,
      Authorization: headers.Authorization,
      "Content-Type": file.type,
      "x-upsert": "true",
    },
    body: file,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed: ${errText}`);
  }

  // Return public URL
  return `${url}/storage/v1/object/public/${bucket}/${fileName}`;
}
