import { getActorId } from "./actorService.js";

export async function actorId(req, res) {
  const { seriesId } = req.query;

  try {
    const isActorIdExisting = await getActorId(seriesId);
    if (isActorIdExisting) {
      return res.status(200).json({
        message: "actor successfully.",
        actorData: isActorIdExisting.data,
      });
    } else {
      return res.status(500).json({
        "not found tor": error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      "Faild fetch actor": error.message,
    });
  }
}
