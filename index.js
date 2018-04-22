var cheerio = require('cheerio');
var request = require('request');
const fs = require('fs');
const ws = 'https://d1baseball.com'

request('https://d1baseball.com/conference/atlantic-coast-conference', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.table-group').each(function(i, element){
        var div = $(this);
        var division_title = div.find("h4");
        var division_table = div.find("table").find("tbody");
        // Team Record Win% GB Overall Overall% Streak
        var teams =[];
        division_table.find("tr").each(function(){

            var team = {};

            $(this).find("td").each(function(i){
                switch(i){
                    case 0:
                        team.name = $(this).text();
                        team.website = ws + $(this).find("a").attr('href');
                        break;
                    case 1:
                        team.conf_record = $(this).text();
                        break;
                    case 2:
                        team.conf_perc = $(this).text();
                        break;
                    case 3:
                        gamesback = $(this).text();
                        team.gamesback = (gamesback == '-') ? 0 : gamesback; //make it zero instead of - for divisional leader.
                        break
                    case 4:
                        team.overall_record = $(this).text();
                        break;
                    case 5:
                        team.overall_perc = $(this).text();
                        break;
                    case 6:
                        team.streak = $(this).text();    
                }
            });
            teams.push(team);
        });
        console.log(teams[0]);
    });
  }
});