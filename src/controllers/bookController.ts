import supabase from "../database/connection";
import { Request, Response } from "express";

interface CustomRequest<T> extends Request {
  body: T;
}

const getAll = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("books").select("*");

  res.status(200).json(data);
};

const getOne = async (req: Request<{ id: number }>, res: Response) => {
  const id = req.params.id;

  const { data, error } = await supabase.from("books").select("*").eq("id", id);

  res.status(200).json(data);
};

const createOne = async (
  req: CustomRequest<{ name: string }>,
  res: Response
) => {
  const name = req.body.name;

  const { error } = await supabase.from("books").insert({ name }).select();

  res.json({ error });
};

const updateOne = async (
  req: CustomRequest<{ id: number; name: string }>,
  res: Response
) => {
  const { id, name } = req.body;

  const { error } = await supabase
    .from("books")
    .update(name)
    .eq("id", id)
    .select();

  res.json({ error });
};

const deleteOne = async (req: Request<{ id: number }>, res: Response) => {
  const id = req.params.id;

  const { error } = await supabase.from("books").delete().eq("id", id).select();

  res.json({ error });
};

export { getAll, getOne, createOne, updateOne, deleteOne };
