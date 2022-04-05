import { useState } from "react";

export default function useForm(initialValues) {
    const [form, setForm] = useState(initialValues);

    return [form, (e, arr) => setForm({ ...form, [e.target.name]: arr || e.target.value })];
}