import { useState } from "react"
import { Star } from "lucide-react"

import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Props = {
      open: boolean
      onOpenChange: (open: boolean) => void
}

export default function RateExperienceModal({ open, onOpenChange }: Props) {

      const [rating, setRating] = useState(0)
      const [hover, setHover] = useState(0)
      const [comment, setComment] = useState("")

      const handleSubmit = () => {
            console.log({ rating, comment })

            // send to backend later

            onOpenChange(false)
      }

      return (
            <Dialog open={open} onOpenChange={onOpenChange}>

                  <DialogContent className="sm:max-w-md">

                        <DialogHeader>
                              <DialogTitle>Rate Your Experience</DialogTitle>
                              <DialogDescription>
                                    How was your ordering experience today?
                              </DialogDescription>
                        </DialogHeader>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2 py-4">
                              {[1,2,3,4,5].map((star) => (
                                    <Star
                                          key={star}
                                          className={`w-8 h-8 cursor-pointer transition
                                                ${(hover || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"}
                                          `}
                                          onClick={() => setRating(star)}
                                          onMouseEnter={() => setHover(star)}
                                          onMouseLeave={() => setHover(0)}
                                    />
                              ))}
                        </div>

                        <Textarea
                              placeholder="Tell us what we can improve..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                        />

                        <DialogFooter className="mt-4">

                              <Button
                                    variant="ghost"
                                    onClick={() => onOpenChange(false)}
                              >
                                    Skip
                              </Button>

                              <Button
                                    disabled={rating === 0}
                                    onClick={handleSubmit}
                              >
                                    Submit
                              </Button>

                        </DialogFooter>

                  </DialogContent>

            </Dialog>
      )
}