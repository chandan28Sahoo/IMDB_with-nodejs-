module.exports=((routes,request,cheerio)=>{
    routes
        .get('/',(req,res)=>{
            request('https://www.imdb.com/india/top-rated-indian-movies/',(error,resp,html)=>{
                if(!error && resp.statusCode == 200){
                    const $ =cheerio.load(html);
                    let main_div=$('.lister');
                    let main_class=main_div.find('.lister-list');
                    let titleColumn=main_class.find('.titleColumn');
                    let rating =$('td[class="ratingColumn imdbRating"] > strong');
                    let links = titleColumn.find('a');
                    
                    var list_of_urls=[]
                    links.each((i,link)=>{
                        let url=$(link).attr('href')
                        let urls="https://www.imdb.com"+(url)
                        list_of_urls.push(urls)
                    })
                
                    var list_ratings=[]
                    rating.each((i,el)=>{
                        let ratings=($(el).text())
                        list_ratings.push(ratings)
                    })

                    var list_of_titles=[]
                    var list_of_year=[]
                    titleColumn.each((i,el)=>{
                        let title=$(el).find('a').text();
                        let year=$(el).find('.secondaryInfo').text();
                        list_of_year.push(year)
                        list_of_titles.push(title)
                    })
                
                    
                }
                let all_details=[]
                for(let i=0; i<=list_of_titles.length-1; i++){
                    let dict={
                        "name":list_of_titles[i],
                        "year": list_of_year[i],
                        "rating":list_ratings[i],
                        "url":list_of_urls[i] 
                    }
                    all_details.push(dict)
                }
                res.send(all_details)
            })
            
        })
})