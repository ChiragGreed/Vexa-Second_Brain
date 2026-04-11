import got from "got"
import metascraper from "metascraper"
import metascraperImage from "metascraper-image"
import metascraperTitle from "metascraper-title"
import metascraperDescription from "metascraper-description"
import metascraperLogo from "metascraper-logo"


const scraper = metascraper([

    metascraperImage(),

    metascraperTitle(),

    metascraperDescription(),

    metascraperLogo()

])



export async function getLinkPreview(url) {

    try {

        const { body: html } = await got(url);
        
        const metadata = await scraper({ html, url });

        let previewImage = metadata.image

        if (url.includes("x.com") || url.includes("twitter.com")) {
            previewImage = 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'
        }

        return {

            previewImage,

            previewTitle: metadata.title,

            previewDescription: metadata.description,

            previewLogo: metadata.logo

        }

    }

    catch (err) {

        return {

            previewImage: null

        }

    }

}