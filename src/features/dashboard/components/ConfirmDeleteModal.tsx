import { Dialog, Transition } from '@headlessui/react'
import { Fragment, type FC } from 'react'

type ConfirmDeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  deletePost: () => void
}

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  deletePost,
}) => {
  const deletePostAndClose = () => {
    deletePost()
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6"
                >
                  Are you absolutely sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Once you delete a post, there is no going back. Please be
                    certain.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-transparent bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={deletePostAndClose}
                  >
                    Delete this post
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
