$(function(){

	var country = [],
		days = [],
		colors = ['#398BCE', '#15cd72', '#ea2e49', '#604c8d', '#ff6f61', '#10ca7e'],
		date = [];

	function randomColor() {
		let color = Math.round(Math.random() * (colors.length - 1));
		colors.splice(color, 1);
		return colors[color];
	};


	$.ajax({
		method: 'GET',
		url: '/getStatistic',
		success: function(res){
			res.visitors.forEach(function(item){
				days.push(item.date.day);
				country.push(item.country);

				date.push(`${item.date.month}/${item.date.day}/${item.date.year}/`);
			})


			draw(foo(country));
			drawDate(foo(days), foo(date));
		}
	});


	function foo(arr) {
		var a = [], b = [], c = [],prev;
	
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {

				a.push(arr[i]);
				b.push(1);
				c.push(randomColor());
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}



		return [a, b, c];
	}

	function draw(arg){
		let config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
						...arg[1]
					],
					backgroundColor: [
						...arg[2]
					],
					label: 'Dataset 1'
				}],
				labels: [
					...arg[0]
				]
			},
			options: {
				responsive: true,
				legend: {
					display: false
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};
		let ctx = document.getElementById('chart-area').getContext('2d');
		window.myDoughnut = new Chart(ctx, config);
	}


	function drawDate(arg, arg2){

		// console.log(arg2);

		let time = []

		arg2[0].forEach(function(item,index){
			time.push({
				x: item,
				y: arg2[1][index]
			})
		})


		var timeFormat = 'MM/DD/YYYY';

		console.log(time);
		var config = {
			type: 'line',
			data: {
				datasets: [{
					label: 'Visits',
					backgroundColor: "#15cd72",
					borderColor: "#15cd72",
					fill: false,
					data: [...time],
				}]
			},
			options: {
				title: {
					text: 'Chart.js Time Scale'
				},
				legend: {
					display: false,
            		position: 'none',
        		},
				scales: {
				    xAxes: [{
	                    type: "time",
	                    time: {
	                        parser: timeFormat,
	                        tooltipFormat: 'MMM D',
	                        unit: 'day',
							unitStepSize: 1
						}
				    }],
			        yAxes: [
			          {
			            ticks: {
						  min: 0,
					      max: 10,

					      // forces step size to be 5 units
					      stepSize: 1 
			            }
			          }
			        ]
				},
			}
		};

		let ctx = document.getElementById('chart-area-traffic').getContext('2d');
		window.myDoughnut = new Chart(ctx, config);
	}



});
