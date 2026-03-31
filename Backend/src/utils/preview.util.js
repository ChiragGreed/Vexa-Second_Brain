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

        const { body: html } = await got(url)

        const metadata = await scraper({

            html,

            url

        })



        return {

            previewImage: metadata.image,

            previewTitle: metadata.title,

            previewDescription:

                metadata.description,

            previewLogo: metadata.logo

        }

    }

    catch (err) {

        return {

            previewImage: null

        }

    }

}