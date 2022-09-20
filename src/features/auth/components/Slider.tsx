import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

const dataSlider = [
	{
		id: 1,
		title: "Lorem ipsum",
		subTitle: "Lorem"
	},
	{
		id: 2,
		title: "Lorem ipsum",
		subTitle: "Lorem"
	},
	{
		id: 3,
		title: "Lorem ipsum",
		subTitle: "Lorem"
	}
];

export function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			initial: 0,
			loop: true,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			}
		},
		[
			slider => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 3000);
				}
				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			}
		]
	);
	return (
		<section
			className="hidden md:(flex w-1/2) xl:(w-2/5) justify-around bg-no-repeat bg-cover px-8"
			style={{ backgroundImage: "url(/assets/images/login.png)" }}
		>
			<div className="relative w-full max-w-lg mx-auto py-16 lg:px-8 xl:px-0 tracking-wide flex flex-col">
				<img alt="logo_w" className="mb-10" width={87} height={31} src="/assets/images/logo_w.png" />
				<div ref={sliderRef} className="keen-slider">
					{dataSlider.map(slide => (
						<div key={slide.id} className="keen-slider__slide number-slide1 w-full">
							<h1 className="text-white font-semibold text-2xl leading-7">
								Start learning now {slide.id}
							</h1>
							<p className="text-white mt-1 mt-3">
								We provide an easy to use interface with adaptive content and clear direction. You'll
								find bitesize practical information from experts who are industry leaders in their
								field.
							</p>
						</div>
					))}
				</div>
				{loaded && instanceRef.current && (
					<div className="flex space-x-2 mt-5">
						{Array.from({ length: dataSlider.length }).map((item, idx) => (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={`${
									currentSlide === idx
										? "w-6 bg-white cursor-none"
										: "cursor-pointer w-2 bg-[#93CBF1]"
								} h-2 inline-block rounded-full ease-in-out duration-300`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
