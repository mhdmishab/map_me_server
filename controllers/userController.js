import User from "../models/userModel.js";

export const searchKeyword = async (req, res, next) => {
    const { query, userId } = req.query;
    console.log(query, userId);

    if (!query || !userId) {
        return res.status(400).json({ error: 'Query and userId parameters are required' });
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon, display_name } = data[0];
            console.log(lat, lon, display_name);

            // Save search term to user's searchKeywords
            const user = await User.findById(userId);
            if (user) {
                // Check if the placeName already exists in searchKeywords
                const exists = user.searchKeywords.some(sk => sk.placeName === display_name);
                if (!exists) {
                    user.searchKeywords.push({ placeName: display_name, lon, lat });
                    await user.save();
                }
            }

            return res.json({ location: { lat, lon, placeName: display_name } });
        } else {
            return res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        console.error('Error fetching location:', error);
        next(error);
    }
};

export const searchHistory = async (req, res, next) => {
    console.log("here")
    const { userId } = req.query;
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ error: 'userId parameter is required' });
    }

    try {
        const user = await User.findById(userId);
        if (user) {
            const sortedHistory = user.searchKeywords.reverse();
            res.json({ history: sortedHistory });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching search history:', error);
        next(error)
    }
}

export const deleteKeyword = async (req, res, next) => {
    console.log("here");
    const { term } = req.params;
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId parameter is required' });
    }

    try {
        const user = await User.findById(userId);
        if (user) {
            user.searchKeywords = user.searchKeywords.filter(keyword => keyword.placeName !== term);
            await user.save();
            res.status(200).json({ message: 'Search history item deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting search history item:', error);
        next(error);
    }
}
