
const PEXELS_KEY =
  process.env.PEXELS_API_KEY!;

const GOOGLE_MAPS_KEY =
  process.env.GOOGLE_MAPS_API_KEY!;

async function getPlacePhoto(
  query: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Pexels Error: ${response.status}`
      );
    }

    const data = await response.json();

    return (
      data.photos?.[0]?.src?.large ||
      null
    );
  } catch (error) {
    console.error(
      "Pexels image fetch failed:",
      error
    );

    return null;
  }
}

export async function searchPlace(
  query: string
) {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            GOOGLE_MAPS_KEY,

          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.location",
            "places.rating",
          ].join(","),
        },

        body: JSON.stringify({
          textQuery: query,
        }),
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Google Places Error: ${errorText}`
      );
    }

    const data = await response.json();

    const place = data.places?.[0];

    if (!place) {
      return null;
    }

    const imageQuery = [
      place.displayName?.text,
      place.formattedAddress,
    ]
      .filter(Boolean)
      .join(" ");

    const photoUrl =
      await getPlacePhoto(imageQuery);

    return {
      id: place.id,

      name:
        place.displayName?.text || "",

      address:
        place.formattedAddress || "",

      lat:
        place.location?.latitude ||
        null,

      lng:
        place.location?.longitude ||
        null,

      rating:
        place.rating || null,

      photoUrl,
    };
  } catch (error) {
    console.error(
      "searchPlace failed:",
      error
    );

    return null;
  }
}

