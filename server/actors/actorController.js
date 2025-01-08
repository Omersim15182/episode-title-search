import { getActorId } from "./actorIdService.js";

export async function actorId(req, res) {
  const { seriesId } = req.body;
  console.log(seriesId);

  const isActorIdExisting = await getActorId(seriesId);
  if (isActorIdExisting) {
    return res.status(200).json({
      message: "actor successfully.",
      actorData: isActorIdExisting,
    });
  } else {
    return res.status(500).json({
      message: "Faild fetch actor",
    });
  }
}
